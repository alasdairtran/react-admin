import {
    EditContextProvider, getElementsFromRecords, InferredElement, useEditContext, useEditController, useResourceContext
} from '@mochilabs/ra-core';
import inflection from 'inflection';
import * as React from 'react';
import { useEffect, useState } from 'react';
import editFieldTypes from './editFieldTypes';
import { EditView } from './EditView';


const EditViewGuesser = props => {
    const resource = useResourceContext(props);
    const { record } = useEditContext();
    const [inferredChild, setInferredChild] = useState(null);
    useEffect(() => {
        if (record && !inferredChild) {
            const inferredElements = getElementsFromRecords(
                [record],
                editFieldTypes
            );
            const inferredChild = new InferredElement(
                editFieldTypes.form,
                null,
                inferredElements
            );

            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log(
                    `Guessed Edit:

export const ${inflection.capitalize(
                        inflection.singularize(resource)
                    )}Edit = props => (
    <Edit {...props}>
${inferredChild.getRepresentation()}
    </Edit>
);`
                );
            setInferredChild(inferredChild.getElement());
        }
    }, [record, inferredChild, resource]);

    return <EditView {...props}>{inferredChild}</EditView>;
};

EditViewGuesser.propTypes = EditView.propTypes;

const EditGuesser = props => {
    const controllerProps = useEditController(props);
    return (
        <EditContextProvider value={controllerProps}>
            <EditViewGuesser {...props} />
        </EditContextProvider>
    );
};

export default EditGuesser;
