import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { useRecordContext } from '@mochilabs/ra-core';
import get from 'lodash/get';
import * as React from 'react';
import { ElementType, FC, memo } from 'react';
import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';


const TextField: FC<TextFieldProps> = memo<TextFieldProps>(props => {
    const { className, source, emptyText, ...rest } = props;
    const record = useRecordContext(props);
    const value = get(record, source);

    return (
        <Typography
            component="span"
            variant="body2"
            className={className}
            {...sanitizeFieldRestProps(rest)}
        >
            {value != null && typeof value !== 'string'
                ? JSON.stringify(value)
                : value || emptyText}
        </Typography>
    );
});

// what? TypeScript loses the displayName if we don't set it explicitly
TextField.displayName = 'TextField';

TextField.defaultProps = {
    addLabel: true,
};

TextField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
    ...fieldPropTypes,
};

export interface TextFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        TypographyProps {
    // TypographyProps do not expose the component props, see https://github.com/mui-org/material-ui/issues/19512
    component?: ElementType<any>;
}

export default TextField;
