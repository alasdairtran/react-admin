import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    complete, getNotification, hideNotification, undo, undoableEventEmitter,
    useTranslate
} from '@mochilabs/ra-core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface Props {
    type?: string;
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        success: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
        },
        error: {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.error.contrastText,
        },
        warning: {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.contrastText,
        },
        undo: (props: Props & Omit<SnackbarProps, 'open'>) => ({
            color:
                props.type === 'success'
                    ? theme.palette.success.contrastText
                    : theme.palette.primary.light,
        }),
    }),
    { name: 'RaNotification' }
);

const Notification: React.FunctionComponent<
    Props & Omit<SnackbarProps, 'open'>
> = props => {
    const {
        classes: classesOverride,
        type,
        className,
        autoHideDuration,
        ...rest
    } = props;
    const [open, setOpen] = useState(false);
    const notification = useSelector(getNotification);
    const dispatch = useDispatch();
    const translate = useTranslate();
    const styles = useStyles(props);

    useEffect(() => {
        setOpen(!!notification);
    }, [notification]);

    const handleRequestClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const handleExited = useCallback(() => {
        if (notification && notification.undoable) {
            dispatch(complete());
            undoableEventEmitter.emit('end', { isUndo: false });
        }
        dispatch(hideNotification());
    }, [dispatch, notification]);

    const handleUndo = useCallback(() => {
        dispatch(undo());
        undoableEventEmitter.emit('end', { isUndo: true });
    }, [dispatch]);

    return (
        <Snackbar
            open={open}
            message={
                notification &&
                notification.message &&
                translate(notification.message, notification.messageArgs)
            }
            autoHideDuration={
                (notification && notification.autoHideDuration) ||
                autoHideDuration
            }
            disableWindowBlurListener={notification && notification.undoable}
            onExited={handleExited}
            onClose={handleRequestClose}
            ContentProps={{
                className: classnames(
                    styles[(notification && notification.type) || type],
                    className
                ),
            }}
            action={
                notification && notification.undoable ? (
                    <Button
                        color="primary"
                        className={styles.undo}
                        size="small"
                        onClick={handleUndo}
                    >
                        {translate('ra.action.undo')}
                    </Button>
                ) : null
            }
            {...rest}
        />
    );
};

Notification.propTypes = {
    type: PropTypes.string,
};

Notification.defaultProps = {
    type: 'info',
    autoHideDuration: 4000,
};

export default Notification;
