import { Link, Typography } from '@material-ui/core';
import { useRecordContext } from '@mochilabs/ra-core';
import get from 'lodash/get';
import * as React from 'react';
import { AnchorHTMLAttributes, FC, memo } from 'react';
import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';

const UrlField: FC<UrlFieldProps> = memo<UrlFieldProps>(props => {
    const { className, emptyText, source, ...rest } = props;
    const record = useRecordContext(props);
    const value = get(record, source);

    if (value == null) {
        return (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {emptyText}
            </Typography>
        );
    }

    return (
        <Link
            className={className}
            href={value}
            {...sanitizeFieldRestProps(rest)}
        >
            {value}
        </Link>
    );
});

UrlField.defaultProps = {
    addLabel: true,
};

UrlField.propTypes = fieldPropTypes;
UrlField.displayName = 'UrlField';

export interface UrlFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        AnchorHTMLAttributes<HTMLAnchorElement> {}

export default UrlField;
