import { Record as RaRecord } from '@mochilabs/ra-core';
import { createContext } from 'react';

const DatagridContext = createContext<DatagridContextValue>({});

DatagridContext.displayName = 'DatagridContext';

export type DatagridContextValue = {
    isRowExpandable?: (record: RaRecord) => boolean;
};

export default DatagridContext;
