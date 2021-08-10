import { ListItemIcon, MenuItem, useMediaQuery } from '@material-ui/core';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import { useLogout, useTranslate } from '@mochilabs/ra-core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FunctionComponent, ReactElement, useCallback } from 'react';


interface Props {
    className?: string;
    redirectTo?: string;
    icon?: ReactElement;
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        menuItem: {
            color: theme.palette.text.secondary,
        },
        icon: { minWidth: theme.spacing(5) },
    }),
    { name: 'RaLogout' }
);

/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
const LogoutWithRef: FunctionComponent<
    Props & MenuItemProps<'li', { button: true }> // HACK: https://github.com/mui-org/material-ui/issues/16245
> = React.forwardRef(function Logout(props, ref) {
    const {
        className,
        classes: classesOverride,
        redirectTo,
        icon,
        ...rest
    } = props;
    const classes = useStyles(props);
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const translate = useTranslate();
    const logout = useLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClick = useCallback(() => logout(null, redirectTo, false), [
        redirectTo,
        logout,
    ]);
    return (
        <MenuItem
            className={classnames('logout', classes.menuItem, className)}
            onClick={handleClick}
            ref={ref}
            component={isXSmall ? 'span' : 'li'}
            {...rest}
        >
            <ListItemIcon className={classes.icon}>
                {icon ? icon : <ExitIcon />}
            </ListItemIcon>
            {translate('ra.auth.logout')}
        </MenuItem>
    );
});

LogoutWithRef.propTypes = {
    className: PropTypes.string,
    redirectTo: PropTypes.string,
    icon: PropTypes.element,
};

export default LogoutWithRef;
