import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useRecordContext } from '@mochilabs/ra-core';
import get from 'lodash/get';
import * as React from 'react';
import { AnchorHTMLAttributes, FC, memo } from 'react';
import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';


// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

const EmailField: FC<EmailFieldProps> = memo<EmailFieldProps>(props => {
    const { className, source, emptyText, ...rest } = props;
    const record = useRecordContext(props);
    const value = get(record, source);

    if (value == null) {
        return emptyText ? (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {emptyText}
            </Typography>
        ) : null;
    }

    return (
        <Link
            className={className}
            href={`mailto:${value}`}
            onClick={stopPropagation}
            {...sanitizeFieldRestProps(rest)}
        >
            {value}
        </Link>
    );
});

EmailField.defaultProps = {
    addLabel: true,
};

EmailField.propTypes = fieldPropTypes;

export interface EmailFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        AnchorHTMLAttributes<HTMLAnchorElement> {}

export default EmailField;
