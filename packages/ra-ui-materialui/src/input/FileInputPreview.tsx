import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { useTranslate } from '@mochilabs/ra-core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FunctionComponent, ReactNode, useEffect } from 'react';

const useStyles = makeStyles(
    theme => ({
        removeButton: {},
        removeIcon: {
            color: theme.palette.error.main,
        },
    }),
    { name: 'RaFileInputPreview' }
);

interface Props {
    children: ReactNode;
    className?: string;
    classes?: object;
    onRemove: () => void;
    file: any;
}

const FileInputPreview: FunctionComponent<Props> = props => {
    const {
        children,
        classes: classesOverride,
        className,
        onRemove,
        file,
        ...rest
    } = props;
    const classes = useStyles(props);
    const translate = useTranslate();

    useEffect(() => {
        return () => {
            const preview = file.rawFile ? file.rawFile.preview : file.preview;

            if (preview) {
                window.URL.revokeObjectURL(preview);
            }
        };
    }, [file]);

    return (
        <div className={className} {...rest}>
            <IconButton
                className={classes.removeButton}
                onClick={onRemove}
                aria-label={translate('ra.action.delete')}
                title={translate('ra.action.delete')}
            >
                <RemoveCircle className={classes.removeIcon} />
            </IconButton>
            {children}
        </div>
    );
};

FileInputPreview.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    file: PropTypes.object,
    onRemove: PropTypes.func.isRequired,
};

FileInputPreview.defaultProps = {
    file: undefined,
};

export default FileInputPreview;
