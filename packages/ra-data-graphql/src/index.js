import {
    CREATE, DELETE, GET_LIST, GET_MANY,
    GET_MANY_REFERENCE, GET_ONE, UPDATE
} from '@mochilabs/ra-core';
import get from 'lodash/get';
import merge from 'lodash/merge';
import pluralize from 'pluralize';
import buildApolloClient from './buildApolloClient';
import {
    ALL_TYPES as INNER_ALL_TYPES, MUTATION_TYPES as INNER_MUTATION_TYPES, QUERY_TYPES as INNER_QUERY_TYPES
} from './constants';
import defaultResolveIntrospection from './introspection';

export const QUERY_TYPES = INNER_QUERY_TYPES;
export const MUTATION_TYPES = INNER_MUTATION_TYPES;
export const ALL_TYPES = INNER_ALL_TYPES;

const defaultOptions = {
    resolveIntrospection: defaultResolveIntrospection,
    introspection: {
        operationNames: {
            [GET_LIST]: resource => `all${pluralize(resource.name)}`,
            [GET_ONE]: resource => `${resource.name}`,
            [GET_MANY]: resource => `all${pluralize(resource.name)}`,
            [GET_MANY_REFERENCE]: resource => `all${pluralize(resource.name)}`,
            [CREATE]: resource => `create${resource.name}`,
            [UPDATE]: resource => `update${resource.name}`,
            [DELETE]: resource => `delete${resource.name}`,
        },
        exclude: undefined,
        include: undefined,
    },
};

const getOptions = (options, aorFetchType, resource) => {
    if (typeof options === 'function') {
        return options(resource, aorFetchType);
    }

    return options;
};

export default async options => {
    const {
        client: clientObject,
        clientOptions,
        introspection,
        resolveIntrospection,
        buildQuery: buildQueryFactory,
        override = {},
        ...otherOptions
    } = merge({}, defaultOptions, options);

    if (override && process.env.NODE_ENV === 'production') {
        console.warn(
            // eslint-disable-line
            'The override option is deprecated. You should instead wrap the buildQuery function provided by the dataProvider you use.'
        );
    }

    const client = clientObject || buildApolloClient(clientOptions);

    let introspectionResults;
    if (introspection) {
        introspectionResults = await resolveIntrospection(
            client,
            introspection
        );
    }

    const buildQuery = buildQueryFactory(introspectionResults, otherOptions);

    const raDataProvider = (aorFetchType, resource, params) => {
        const overriddenBuildQuery = get(
            override,
            `${resource}.${aorFetchType}`
        );

        try {
            const { parseResponse, ...query } = overriddenBuildQuery
                ? {
                      ...buildQuery(aorFetchType, resource, params),
                      ...overriddenBuildQuery(params),
                  }
                : buildQuery(aorFetchType, resource, params);

            const operation = getQueryOperation(query.query);

            if (operation === 'query') {
                const apolloQuery = {
                    ...query,
                    fetchPolicy: 'network-only',
                    ...getOptions(otherOptions.query, aorFetchType, resource),
                };

                return client
                    .query(apolloQuery)
                    .then(response => parseResponse(response));
            }

            const apolloQuery = {
                mutation: query.query,
                variables: query.variables,
                ...getOptions(otherOptions.mutation, aorFetchType, resource),
            };

            return client.mutate(apolloQuery).then(parseResponse);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    raDataProvider.observeRequest = (aorFetchType, resource, params) => {
        const { parseResponse, ...query } = buildQuery(
            aorFetchType,
            resource,
            params
        );

        const apolloQuery = {
            ...query,
            ...getOptions(otherOptions.watchQuery, aorFetchType, resource),
        };

        return client.watchQuery(apolloQuery).then(parseResponse);
    };

    raDataProvider.saga = () => {};

    return raDataProvider;
};

const getQueryOperation = query => {
    if (query && query.definitions && query.definitions.length > 0) {
        return query.definitions[0].operation;
    }

    throw new Error('Unable to determine the query operation');
};
