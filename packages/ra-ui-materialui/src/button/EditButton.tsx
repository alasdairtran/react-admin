import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import ContentCreate from '@material-ui/icons/Create';
import { linkToRecord, Record, useResourceContext } from '@mochilabs/ra-core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FC, ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button, { ButtonProps } from './Button';


/**
 * Opens the Edit view of a given record:
 *
 * @example // basic usage
 * import { EditButton } from 'react-admin';
 *
 * const CommentEditButton = ({ record }) => (
 *     <EditButton basePath="/comments" label="Edit comment" record={record} />
 * );
 */
const EditButton: FC<EditButtonProps> = ({
    basePath = '',
    icon = defaultIcon,
    label = 'ra.action.edit',
    record,
    scrollToTop = true,
    ...rest
}) => {
    const resource = useResourceContext();
    return (
        <Button
            component={Link}
            to={useMemo(
                () => ({
                    pathname: record
                        ? linkToRecord(basePath || `/${resource}`, record.id)
                        : '',
                    state: { _scrollToTop: scrollToTop },
                }),
                [basePath, record, resource, scrollToTop]
            )}
            label={label}
            onClick={stopPropagation}
            {...(rest as any)}
        >
            {icon}
        </Button>
    );
};

const defaultIcon = <ContentCreate />;

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

interface Props {
    basePath?: string;
    icon?: ReactElement;
    label?: string;
    record?: Record;
    scrollToTop?: boolean;
}

export type EditButtonProps = Props & ButtonProps & MuiButtonProps;

EditButton.propTypes = {
    basePath: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
    record: PropTypes.any,
    scrollToTop: PropTypes.bool,
};

export default EditButton;
