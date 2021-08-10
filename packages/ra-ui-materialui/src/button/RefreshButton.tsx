import NavigationRefresh from '@material-ui/icons/Refresh';
import { refreshView } from '@mochilabs/ra-core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FC, MouseEvent, ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button, { ButtonProps } from './Button';


const RefreshButton: FC<RefreshButtonProps> = ({
    label = 'ra.action.refresh',
    icon = defaultIcon,
    onClick,
    ...rest
}) => {
    const dispatch = useDispatch();
    const handleClick = useCallback(
        event => {
            event.preventDefault();
            dispatch(refreshView());
            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        [dispatch, onClick]
    );

    return (
        <Button label={label} onClick={handleClick} {...rest}>
            {icon}
        </Button>
    );
};

const defaultIcon = <NavigationRefresh />;

interface Props {
    label?: string;
    icon?: ReactElement;
    onClick?: (e: MouseEvent) => void;
}

export type RefreshButtonProps = Props & ButtonProps;

RefreshButton.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
};

export default RefreshButton;
