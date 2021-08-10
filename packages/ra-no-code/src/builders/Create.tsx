import { useResourceContext } from '@mochilabs/ra-core';
import {
    Create as RaCreate,
    CreateProps,
    SimpleForm,
    SimpleFormProps
} from '@mochilabs/ra-ui-materialui';
import React from 'react';
import {
    useResourceConfiguration,
    useResourcesConfiguration
} from '../ResourceConfiguration';
import { getInputFromFieldDefinition } from './getInputFromFieldDefinition';

export const Create = (props: CreateProps) => (
    <RaCreate {...props}>
        <CreateForm />
    </RaCreate>
);

export const CreateForm = (props: Omit<SimpleFormProps, 'children'>) => {
    const resource = useResourceContext(props);
    const [resources] = useResourcesConfiguration();
    const [resourceConfiguration] = useResourceConfiguration(resource);

    return (
        <SimpleForm {...props}>
            {resourceConfiguration.fields
                .filter(definition => definition.views.includes('create'))
                .map(definition =>
                    getInputFromFieldDefinition(definition, resources)
                )}
        </SimpleForm>
    );
};
