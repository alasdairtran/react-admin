import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { TestContext } from '@mochilabs/ra-test';
import { render } from '@testing-library/react';
import expect from 'expect';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { Router } from 'react-router-dom';
import { CloneButton } from './CloneButton';


const theme = createMuiTheme();

const invalidButtonDomProps = {
    basePath: '/posts',
    handleSubmit: jest.fn(),
    handleSubmitWithRedirect: jest.fn(),
    invalid: false,
    onSave: jest.fn(),
    pristine: false,
    record: { id: 123, foo: 'bar' },
    redirect: 'list',
    resource: 'posts',
    saving: false,
    submitOnEnter: true,
    undoable: false,
};

describe('<CloneButton />', () => {
    it('should pass a clone of the record in the location state', () => {
        const history = createMemoryHistory();
        const { getByRole } = render(
            <Router history={history}>
                <ThemeProvider theme={theme}>
                    <CloneButton
                        record={{ id: 123, foo: 'bar' }}
                        basePath="/posts"
                    />
                </ThemeProvider>
            </Router>
        );

        const button = getByRole('button');
        expect(button.getAttribute('href')).toEqual(
            '/posts/create?source=%7B%22foo%22%3A%22bar%22%7D'
        );
    });

    it('should render as button type with no DOM errors', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const { getByRole } = render(
            <TestContext>
                <ThemeProvider theme={theme}>
                    <CloneButton {...invalidButtonDomProps} />
                </ThemeProvider>
            </TestContext>
        );

        expect(spy).not.toHaveBeenCalled();
        expect(getByRole('button').getAttribute('href')).toEqual(
            '/posts/create?source=%7B%22foo%22%3A%22bar%22%7D'
        );

        spy.mockRestore();
    });
});
