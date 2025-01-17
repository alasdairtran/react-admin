import {
    CreateContextProvider,
    ResourceContextProvider,
    useCheckMinimumRequiredProps,
    useCreateController
} from '@mochilabs/ra-core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ReactElement } from 'react';
import { CreateProps } from '../types';
import { CreateView } from './CreateView';


/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes the `record` as prop.
 *
 * The <Create> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - successMessage
 * - title
 *
 * @example
 *
 * // in src/posts.js
 * import * as React from "react";
 * import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 * export const PostCreate = (props) => (
 *     <Create {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *         </SimpleForm>
 *     </Create>
 * );
 *
 * // in src/App.js
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 *
 * import { PostCreate } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" create={PostCreate} />
 *     </Admin>
 * );
 * export default App;
 */
export const Create = (
    props: CreateProps & { children: ReactElement }
): ReactElement => {
    useCheckMinimumRequiredProps('Create', ['children'], props);
    const controllerProps = useCreateController(props);
    const body = (
        <CreateContextProvider value={controllerProps}>
            <CreateView {...props} {...controllerProps} />
        </CreateContextProvider>
    );
    return props.resource ? (
        // support resource override via props
        <ResourceContextProvider value={props.resource}>
            {body}
        </ResourceContextProvider>
    ) : (
        body
    );
};

Create.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    resource: PropTypes.string,
    title: PropTypes.node,
    record: PropTypes.object,
    hasList: PropTypes.bool,
    successMessage: PropTypes.string,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    transform: PropTypes.func,
};

export default Create;
