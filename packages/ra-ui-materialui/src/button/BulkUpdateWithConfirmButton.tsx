import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionUpdate from '@material-ui/icons/Update';
import {
    CRUD_UPDATE_MANY, MutationMode, useNotify, useRefresh, useResourceContext, useTranslate, useUnselectAll, useUpdateMany
} from '@mochilabs/ra-core';
import inflection from 'inflection';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FC, Fragment, ReactElement, useState } from 'react';
import Confirm from '../layout/Confirm';
import { BulkActionProps } from '../types';
import Button, { ButtonProps } from './Button';


const useStyles = makeStyles(
    theme => ({
        updateButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }),
    { name: 'RaBulkUpdateWithConfirmButton' }
);

const defaultIcon = <ActionUpdate />;

const BulkUpdateWithConfirmButton: FC<BulkUpdateWithConfirmButtonProps> = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const translate = useTranslate();
    const unselectAll = useUnselectAll();
    const resource = useResourceContext(props);
    const classes = useStyles(props);
    const [isOpen, setOpen] = useState(false);

    const {
        basePath,
        mutationMode,
        classes: classesOverride,
        confirmTitle = 'ra.message.bulk_update_title',
        confirmContent = 'ra.message.bulk_update_content',
        data,
        icon = defaultIcon,
        label,
        onClick,
        selectedIds,
        onSuccess = () => {
            refresh();
            notify('ra.notification.updated', 'info', {
                smart_count: selectedIds.length,
            });
            unselectAll(resource);
        },
        onFailure = error => {
            notify(
                typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error',
                'warning',
                {
                    _:
                        typeof error === 'string'
                            ? error
                            : error && error.message
                            ? error.message
                            : undefined,
                }
            );
            setOpen(false);
        },
        ...rest
    } = props;

    const [updateMany, { loading }] = useUpdateMany(
        resource,
        selectedIds,
        data,
        {
            action: CRUD_UPDATE_MANY,
            onSuccess,
            onFailure,
            mutationMode,
        }
    );

    const handleClick = e => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleUpdate = e => {
        updateMany();

        if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    return (
        <Fragment>
            <Button
                onClick={handleClick}
                label={label}
                className={classes.updateButton}
                {...sanitizeRestProps(rest)}
            >
                {icon}
            </Button>
            <Confirm
                isOpen={isOpen}
                loading={loading}
                title={confirmTitle}
                content={confirmContent}
                translateOptions={{
                    smart_count: selectedIds.length,
                    name: translate(`resources.${resource}.forcedCaseName`, {
                        smart_count: selectedIds.length,
                        _: inflection.humanize(
                            translate(`resources.${resource}.name`, {
                                smart_count: selectedIds.length,
                                _: inflection.inflect(
                                    resource,
                                    selectedIds.length
                                ),
                            }),
                            true
                        ),
                    }),
                }}
                onConfirm={handleUpdate}
                onClose={handleDialogClose}
            />
        </Fragment>
    );
};

const sanitizeRestProps = ({
    basePath,
    classes,
    filterValues,
    label,
    onSuccess,
    onFailure,
    ...rest
}: Omit<
    BulkUpdateWithConfirmButtonProps,
    'resource' | 'selectedIds' | 'icon' | 'data'
>) => rest;

export interface BulkUpdateWithConfirmButtonProps
    extends BulkActionProps,
        ButtonProps {
    confirmContent?: React.ReactNode;
    confirmTitle?: string;
    icon?: ReactElement;
    data: any;
    onSuccess?: () => void;
    onFailure?: (error: any) => void;
    mutationMode?: MutationMode;
}

BulkUpdateWithConfirmButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    confirmTitle: PropTypes.string,
    confirmContent: PropTypes.string,
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    icon: PropTypes.element,
    data: PropTypes.any.isRequired,
    mutationMode: PropTypes.oneOf(['pessimistic', 'optimistic', 'undoable']),
};

BulkUpdateWithConfirmButton.defaultProps = {
    label: 'ra.action.update',
    mutationMode: 'pessimistic',
};

export default BulkUpdateWithConfirmButton;
