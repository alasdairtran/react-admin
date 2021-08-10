import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup, { FormGroupProps } from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import { FieldTitle, InputProps, useInput } from '@mochilabs/ra-core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FunctionComponent, useCallback } from 'react';
import InputHelperText from './InputHelperText';
import InputPropTypes from './InputPropTypes';
import sanitizeInputRestProps from './sanitizeInputRestProps';


const BooleanInput: FunctionComponent<BooleanInputProps> = ({
    format,
    label,
    fullWidth,
    helperText,
    onBlur,
    onChange,
    onFocus,
    options,
    disabled,
    parse,
    resource,
    source,
    validate,
    ...rest
}) => {
    const {
        id,
        input: { onChange: finalFormOnChange, type, value, ...inputProps },
        isRequired,
        meta: { error, submitError, touched },
    } = useInput({
        format,
        onBlur,
        onChange,
        onFocus,
        parse,
        resource,
        source,
        type: 'checkbox',
        validate,
        ...rest,
    });

    const handleChange = useCallback(
        (event, value) => {
            finalFormOnChange(value);
        },
        [finalFormOnChange]
    );

    return (
        <FormGroup {...sanitizeInputRestProps(rest)}>
            <FormControlLabel
                control={
                    <Switch
                        id={id}
                        color="primary"
                        onChange={handleChange}
                        {...inputProps}
                        {...options}
                        disabled={disabled}
                    />
                }
                label={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
            />
            <FormHelperText error={!!(error || submitError)}>
                <InputHelperText
                    touched={touched}
                    error={error || submitError}
                    helperText={helperText}
                />
            </FormHelperText>
        </FormGroup>
    );
};

BooleanInput.propTypes = {
    ...InputPropTypes,
    // @ts-ignore
    options: PropTypes.shape(Switch.propTypes),
    disabled: PropTypes.bool,
};

BooleanInput.defaultProps = {
    options: {},
};

export type BooleanInputProps = InputProps<SwitchProps> &
    Omit<FormGroupProps, 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus'>;

export default BooleanInput;
