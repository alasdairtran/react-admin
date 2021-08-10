import { AdminContextProps, CoreAdminContext } from '@mochilabs/ra-core';
import * as React from 'react';
import { FC } from 'react';
import defaultI18nProvider from './defaultI18nProvider';


const AdminContext: FC<AdminContextProps> = props => (
    <CoreAdminContext {...props} />
);

AdminContext.defaultProps = {
    i18nProvider: defaultI18nProvider,
};

AdminContext.displayName = 'AdminContext';

export default AdminContext;
