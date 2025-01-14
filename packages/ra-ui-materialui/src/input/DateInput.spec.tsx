import { FormWithRedirect, required } from '@mochilabs/ra-core';
import { renderWithRedux } from '@mochilabs/ra-test';
import { fireEvent, render } from '@testing-library/react';
import format from 'date-fns/format';
import expect from 'expect';
import { FormApi } from 'final-form';
import * as React from 'react';
import { Form } from 'react-final-form';
import DateInput from './DateInput';


describe('<DateInput />', () => {
    const defaultProps = {
        resource: 'posts',
        source: 'publishedAt',
    };

    it('should render a date input', () => {
        const { getByLabelText } = render(
            <Form
                onSubmit={jest.fn}
                render={() => <DateInput {...defaultProps} />}
            />
        );
        const input = getByLabelText(
            'resources.posts.fields.publishedAt'
        ) as HTMLInputElement;
        expect(input.type).toBe('date');
    });

    it('should not make the form dirty on initialization', () => {
        const publishedAt = new Date().toISOString();
        let formApi: FormApi;
        const { getByDisplayValue } = renderWithRedux(
            <FormWithRedirect
                onSubmit={jest.fn}
                record={{ id: 1, publishedAt }}
                render={({ form }) => {
                    formApi = form;
                    return <DateInput {...defaultProps} />;
                }}
            />
        );
        expect(getByDisplayValue(format(publishedAt, 'YYYY-MM-DD')));
        expect(formApi.getState().dirty).toEqual(false);
    });

    it('should call `input.onChange` method when changed', () => {
        let formApi;
        const { getByLabelText } = render(
            <Form
                onSubmit={jest.fn()}
                render={({ form }) => {
                    formApi = form;
                    return <DateInput {...defaultProps} />;
                }}
            />
        );
        const input = getByLabelText('resources.posts.fields.publishedAt');
        fireEvent.change(input, {
            target: { value: '2010-01-04' },
        });
        expect(formApi.getState().values.publishedAt).toEqual('2010-01-04');
    });

    describe('error message', () => {
        it('should not be displayed if field is pristine', () => {
            const { queryByText } = render(
                <Form
                    onSubmit={jest.fn}
                    render={() => (
                        <DateInput {...defaultProps} validate={required()} />
                    )}
                />
            );
            expect(queryByText('ra.validation.required')).toBeNull();
        });

        it('should be displayed if field has been touched and is invalid', () => {
            const { getByLabelText, queryByText } = render(
                <Form
                    onSubmit={jest.fn}
                    validateOnBlur
                    render={() => (
                        <DateInput {...defaultProps} validate={required()} />
                    )}
                />
            );
            const input = getByLabelText(
                'resources.posts.fields.publishedAt *'
            );
            input.focus();
            input.blur();
            expect(queryByText('ra.validation.required')).not.toBeNull();
        });
    });
});
