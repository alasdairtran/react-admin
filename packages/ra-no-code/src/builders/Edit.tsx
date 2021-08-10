import { useResourceContext } from '@mochilabs/ra-core';
import {
    Edit as RaEdit,
    EditProps,
    SimpleForm,
    SimpleFormProps
} from '@mochilabs/ra-ui-materialui';
import React from 'react';
import {
    useResourceConfiguration,
    useResourcesConfiguration
} from '../ResourceConfiguration';
import { getInputFromFieldDefinition } from './getInputFromFieldDefinition';

export const Edit = (props: EditProps) => (
    <RaEdit {...props}>
        <EditForm />
    </RaEdit>
);

export const EditForm = (props: Omit<SimpleFormProps, 'children'>) => {
    const resource = useResourceContext(props);
    const [resources] = useResourcesConfiguration();
    const [resourceConfiguration] = useResourceConfiguration(resource);

    return (
        <SimpleForm {...props}>
            {resourceConfiguration.fields
                .filter(definition => definition.views.includes('edit'))
                .map(definition =>
                    getInputFromFieldDefinition(definition, resources)
                )}
        </SimpleForm>
    );
};
