import Queue from '@material-ui/icons/Queue';
import { Record, useResourceContext } from '@mochilabs/ra-core';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import * as React from 'react';
import { FC, memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Button, { ButtonProps } from './Button';


export const CloneButton: FC<CloneButtonProps> = ({
    basePath = '',
    label = 'ra.action.clone',
    scrollToTop = true,
    record,
    icon = defaultIcon,
    ...rest
}) => {
    const resource = useResourceContext();
    const pathname = basePath ? `${basePath}/create` : `/${resource}/create`;
    return (
        <Button
            component={Link}
            to={
                record
                    ? {
                          pathname,
                          search: stringify({
                              source: JSON.stringify(omitId(record)),
                          }),
                          state: { _scrollToTop: scrollToTop },
                      }
                    : pathname
            }
            label={label}
            onClick={stopPropagation}
            {...rest}
        >
            {icon}
        </Button>
    );
};

const defaultIcon = <Queue />;

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

const omitId = ({ id, ...rest }: Record) => rest;

interface Props {
    basePath?: string;
    record?: Record;
    icon?: ReactElement;
    scrollToTop?: boolean;
}

export type CloneButtonProps = Props & ButtonProps;

CloneButton.propTypes = {
    basePath: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
    record: PropTypes.any,
};

export default memo(CloneButton);
