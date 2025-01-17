import Chip, { ChipProps } from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRecordContext } from '@mochilabs/ra-core';
import classnames from 'classnames';
import get from 'lodash/get';
import * as React from 'react';
import { FC, memo } from 'react';
import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';


const useStyles = makeStyles(
    {
        chip: { margin: 4, cursor: 'inherit' },
    },
    { name: 'RaChipField' }
);

export const ChipField: FC<ChipFieldProps> = memo<ChipFieldProps>(props => {
    const {
        className,
        classes: classesOverride,
        source,
        emptyText,
        ...rest
    } = props;
    const record = useRecordContext(props);
    const classes = useStyles(props);
    const value = get(record, source);

    if (value == null && emptyText) {
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
        <Chip
            className={classnames(classes.chip, className)}
            label={value}
            {...sanitizeFieldRestProps(rest)}
        />
    );
});

ChipField.defaultProps = {
    addLabel: true,
};

ChipField.propTypes = {
    ...ChipField.propTypes,
    ...fieldPropTypes,
};

export interface ChipFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        Omit<ChipProps, 'label'> {}

export default ChipField;
