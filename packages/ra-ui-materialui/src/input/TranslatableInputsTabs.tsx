import { AppBar, Tabs, TabsProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslatableContext } from '@mochilabs/ra-core';
import * as React from 'react';
import { ReactElement } from 'react';
import { AppBarProps } from '../layout';
import { TranslatableInputsTab } from './TranslatableInputsTab';

/**
 * Default locale selector for the TranslatableInputs component. Generates a tab for each specified locale.
 * @see TranslatableInputs
 */
export const TranslatableInputsTabs = (
    props: TranslatableInputsTabsProps & AppBarProps
): ReactElement => {
    const { groupKey, TabsProps: tabsProps } = props;
    const { locales, selectLocale, selectedLocale } = useTranslatableContext();
    const classes = useStyles(props);

    const handleChange = (event, newLocale): void => {
        selectLocale(newLocale);
    };

    return (
        <AppBar color="default" position="static" className={classes.root}>
            <Tabs
                value={selectedLocale}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                {...tabsProps}
            >
                {locales.map(locale => (
                    <TranslatableInputsTab
                        key={locale}
                        value={locale}
                        locale={locale}
                        groupKey={groupKey}
                    />
                ))}
            </Tabs>
        </AppBar>
    );
};

export interface TranslatableInputsTabsProps {
    groupKey?: string;
    TabsProps?: TabsProps;
}

const useStyles = makeStyles(
    theme => ({
        root: {
            boxShadow: 'none',
            borderRadius: 0,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
        },
    }),
    { name: 'RaTranslatableInputsTabs' }
);
