import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { useRecordContext } from '@mochilabs/ra-core';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FC, memo } from 'react';
import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';


export const removeTags = (input: string) =>
    input ? input.replace(/<[^>]+>/gm, '') : '';

const RichTextField: FC<RichTextFieldProps> = memo<RichTextFieldProps>(
    props => {
        const { className, emptyText, source, stripTags, ...rest } = props;
        const record = useRecordContext(props);
        const value = get(record, source);

        return (
            <Typography
                className={className}
                variant="body2"
                component="span"
                {...sanitizeFieldRestProps(rest)}
            >
                {value == null && emptyText ? (
                    emptyText
                ) : stripTags ? (
                    removeTags(value)
                ) : (
                    <span dangerouslySetInnerHTML={{ __html: value }} />
                )}
            </Typography>
        );
    }
);

RichTextField.defaultProps = {
    addLabel: true,
    stripTags: false,
};

RichTextField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
    ...fieldPropTypes,
    stripTags: PropTypes.bool,
};

export interface RichTextFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        TypographyProps {
    stripTags?: boolean;
}

RichTextField.displayName = 'RichTextField';

export default RichTextField;
