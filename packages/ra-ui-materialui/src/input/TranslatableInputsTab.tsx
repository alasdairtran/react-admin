import { makeStyles } from '@material-ui/core/styles';
import Tab, { TabProps } from '@material-ui/core/Tab';
import { useFormGroup, useTranslate } from '@mochilabs/ra-core';
import { capitalize } from 'inflection';
import React from 'react';
import { ClassesOverride } from '../types';

/**
 * Single tab that selects a locale in a TranslatableInputs component.
 * @see TranslatableInputs
 */
export const TranslatableInputsTab = (
    props: TranslatableInputsTabProps & TabProps
) => {
    const { groupKey = '', locale, classes: classesOverride, ...rest } = props;
    const { invalid, touched } = useFormGroup(`${groupKey}${locale}`);

    const classes = useStyles(props);
    const translate = useTranslate();

    return (
        <Tab
            id={`translatable-header-${groupKey}${locale}`}
            label={translate(`ra.locales.${locale}`, {
                _: capitalize(locale),
            })}
            className={invalid && touched ? classes.error : undefined}
            {...rest}
        />
    );
};

const useStyles = makeStyles(
    theme => ({
        error: { color: theme.palette.error.main },
    }),
    { name: 'RaTranslatableInputsTab' }
);

interface TranslatableInputsTabProps {
    classes?: ClassesOverride<typeof useStyles>;
    groupKey?: string;
    locale: string;
}
