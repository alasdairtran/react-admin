import { CardContent } from '@material-ui/core';
import { getFieldLabelTranslationArgs, useTranslate } from '@mochilabs/ra-core';
import { TextInput } from '@mochilabs/ra-ui-materialui';
import * as React from 'react';
import { ConfigurationInputsFromFieldDefinition } from './ConfigurationInputsFromFieldDefinition';
import { FieldTypeInput } from './FieldConfiguration/FieldTypeInput';
import { FieldViewsInput } from './FieldConfiguration/FieldViewsInput';

export const FieldConfigurationFormSection = props => {
    const { sourcePrefix, field, resource } = props;
    const translate = useTranslate();
    const labelArgs = getFieldLabelTranslationArgs({
        source: field.props.source,
        resource,
        label: field.props.label,
    });

    return (
        <CardContent>
            <TextInput
                source={`${sourcePrefix}.props.source`}
                label="Source"
                fullWidth
                disabled
            />
            <TextInput
                source={`${sourcePrefix}.props.label`}
                label="Label"
                fullWidth
                initialValue={translate(...labelArgs)}
            />
            <FieldTypeInput
                source={`${sourcePrefix}.type`}
                label="Type"
                fullWidth
            />
            <FieldViewsInput
                source={`${sourcePrefix}.views`}
                label="Views"
                fullWidth
            />
            <ConfigurationInputsFromFieldDefinition
                definition={field}
                sourcePrefix={sourcePrefix}
            />
        </CardContent>
    );
};
