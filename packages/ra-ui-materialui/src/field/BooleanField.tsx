import { Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';
import { SvgIconComponent } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { useRecordContext, useTranslate } from '@mochilabs/ra-core';
import classnames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FC, memo } from 'react';
import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';


const useStyles = makeStyles(
    {
        root: {
            display: 'flex',
        },
    },
    {
        name: 'RaBooleanField',
    }
);

export const BooleanField: FC<BooleanFieldProps> = memo<BooleanFieldProps>(
    props => {
        const {
            className,
            classes: classesOverride,
            emptyText,
            source,
            valueLabelTrue,
            valueLabelFalse,
            TrueIcon,
            FalseIcon,
            looseValue,
            ...rest
        } = props;
        const record = useRecordContext(props);
        const translate = useTranslate();
        const classes = useStyles(props);
        const value = get(record, source);
        const isTruthyValue = value === true || (looseValue && value);
        let ariaLabel = value ? valueLabelTrue : valueLabelFalse;

        if (!ariaLabel) {
            ariaLabel = isTruthyValue ? 'ra.boolean.true' : 'ra.boolean.false';
        }

        if (looseValue || value === false || value === true) {
            return (
                <Typography
                    component="span"
                    variant="body2"
                    className={classnames(classes.root, className)}
                    {...sanitizeFieldRestProps(rest)}
                >
                    <Tooltip title={translate(ariaLabel, { _: ariaLabel })}>
                        {isTruthyValue ? (
                            <span>
                                <TrueIcon data-testid="true" fontSize="small" />
                            </span>
                        ) : (
                            <span>
                                <FalseIcon
                                    data-testid="false"
                                    fontSize="small"
                                />
                            </span>
                        )}
                    </Tooltip>
                </Typography>
            );
        }

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
);

BooleanField.defaultProps = {
    addLabel: true,
    TrueIcon: DoneIcon,
    FalseIcon: ClearIcon,
    looseValue: false,
};

BooleanField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
    ...fieldPropTypes,
    valueLabelFalse: PropTypes.string,
    valueLabelTrue: PropTypes.string,
    TrueIcon: PropTypes.elementType,
    FalseIcon: PropTypes.elementType,
    looseValue: PropTypes.bool,
};

export interface BooleanFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        TypographyProps {
    valueLabelTrue?: string;
    valueLabelFalse?: string;
    TrueIcon?: SvgIconComponent;
    FalseIcon?: SvgIconComponent;
    looseValue?: boolean;
}

export default BooleanField;
