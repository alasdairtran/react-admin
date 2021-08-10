import { AdminUIProps, CoreAdminUI } from '@mochilabs/ra-core';
import {
    Layout as DefaultLayout,
    LoadingPage,
    Login,
    Logout,
    NotFound
} from '@mochilabs/ra-ui-materialui';
import * as React from 'react';
import { FC } from 'react';

const AdminUI: FC<AdminUIProps> = props => <CoreAdminUI {...props} />;

AdminUI.defaultProps = {
    layout: DefaultLayout,
    catchAll: NotFound,
    loading: LoadingPage,
    loginPage: Login,
    logout: Logout,
};

export default AdminUI;
