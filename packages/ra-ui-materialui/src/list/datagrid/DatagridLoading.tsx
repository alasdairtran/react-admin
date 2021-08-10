import {
    Checkbox, IconButton, Table, TableBody, TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Identifier, Record, useTimeout } from '@mochilabs/ra-core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FC, memo, ReactElement } from 'react';
import { ClassesOverride } from '../../types';
import Placeholder from '../Placeholder';
import useDatagridStyles from './useDatagridStyles';


const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const DatagridLoading = ({
    classes,
    className,
    expand,
    hasBulkActions,
    nbChildren,
    nbFakeLines = 5,
    size,
}: DatagridLoadingProps): JSX.Element => {
    const oneSecondHasPassed = useTimeout(1000);

    return oneSecondHasPassed ? (
        <Table className={classnames(classes.table, className)} size={size}>
            <TableHead>
                <TableRow className={classes.row}>
                    {expand && (
                        <TableCell
                            padding="none"
                            className={classes.expandHeader}
                        />
                    )}
                    {hasBulkActions && (
                        <TableCell
                            padding="checkbox"
                            className={classes.expandIconCell}
                        >
                            <Checkbox
                                className="select-all"
                                color="primary"
                                checked={false}
                            />
                        </TableCell>
                    )}
                    {times(nbChildren, key => (
                        <TableCell
                            variant="head"
                            className={classes.headerCell}
                            key={key}
                        >
                            <Placeholder />
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {times(nbFakeLines, key1 => (
                    <TableRow key={key1} style={{ opacity: 1 / (key1 + 1) }}>
                        {expand && (
                            <TableCell
                                padding="none"
                                className={classes.expandIconCell}
                            >
                                <IconButton
                                    className={classes.expandIcon}
                                    component="div"
                                    aria-hidden="true"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </TableCell>
                        )}
                        {hasBulkActions && (
                            <TableCell
                                padding="checkbox"
                                className={classes.expandIconCell}
                            >
                                <Checkbox
                                    className="select-all"
                                    color="primary"
                                    checked={false}
                                />
                            </TableCell>
                        )}
                        {times(nbChildren, key2 => (
                            <TableCell className={classes.rowCell} key={key2}>
                                <Placeholder />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ) : null;
};

DatagridLoading.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool,
    nbChildren: PropTypes.number,
    nbFakeLines: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium']),
};

export interface DatagridLoadingProps {
    className?: string;
    classes?: ClassesOverride<typeof useDatagridStyles>;
    expand?:
        | ReactElement
        | FC<{
              basePath: string;
              id: Identifier;
              record: Record;
              resource: string;
          }>;
    hasBulkActions?: boolean;
    nbChildren: number;
    nbFakeLines?: number;
    size?: 'small' | 'medium';
}

export default memo(DatagridLoading);
