import { InferenceTypes } from '@mochilabs/ra-core';
import { FieldProps, SelectInput } from '@mochilabs/ra-ui-materialui';
import * as React from 'react';

export const FieldTypeInput = (props: FieldProps) => (
    <SelectInput choices={INFERENCE_TYPES} {...props} />
);

const INFERENCE_TYPES = InferenceTypes.map(type => ({
    id: type,
    name: type,
}));
