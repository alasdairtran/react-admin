import { DataProviderContext } from '@mochilabs/ra-core';
import { renderWithRedux } from '@mochilabs/ra-test';
import expect from 'expect';
import * as React from 'react';
import { Show } from './Show';


describe('<Show />', () => {
    const defaultShowProps = {
        basePath: '/',
        id: '123',
        resource: 'foo',
        location: {},
        match: {},
    };

    it('should display aside component', () => {
        const Aside = () => <div id="aside">Hello</div>;
        const dataProvider = {
            getOne: () => Promise.resolve({ data: { id: 123 } }),
        };
        const Dummy = () => <div />;
        const { queryAllByText } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <Show {...defaultShowProps} aside={<Aside />}>
                    <Dummy />
                </Show>
            </DataProviderContext.Provider>,
            { admin: { resources: { foo: { data: {} } } } }
        );
        expect(queryAllByText('Hello')).toHaveLength(1);
    });
});
