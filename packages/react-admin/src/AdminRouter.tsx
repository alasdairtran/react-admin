import { AdminRouterProps, CoreAdminRouter } from '@mochilabs/ra-core';
import { LoadingPage } from '@mochilabs/ra-ui-materialui';
import * as React from 'react';
import { FC } from 'react';

const AdminRouter: FC<AdminRouterProps> = props => (
    <CoreAdminRouter {...props} />
);

AdminRouter.defaultProps = {
    loading: LoadingPage,
};

export default AdminRouter;
