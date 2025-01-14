import { makeStyles } from '@material-ui/core/styles';
import { warning } from '@mochilabs/ra-core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

const useStyles = makeStyles(
    {
        cardActions: {
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            padding: 0,
        },
    },
    { name: 'RaCardActions' }
);

const CardActions = props => {
    const { classes: classesOverride, className, children, ...rest } = props;
    warning(
        true,
        '<CardActions> is deprecated. Please use the <TopToolbar> component instead to wrap your action buttons'
    );
    const classes = useStyles(props);
    return (
        <div className={classnames(classes.cardActions, className)} {...rest}>
            {children}
        </div>
    );
};

CardActions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default CardActions;
