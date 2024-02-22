import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Create from '../component/Create';

describe('Create', () => {
    it('renders the form correctly', () => {
        render(<Create setOpen={() => { }} mutate={() => { }} url="" />);

        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('should show error when input is empty', async () => {
        render(<Create setOpen={() => { }} mutate={() => { }} url="" />);

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });


    it('should submit correctly', async () => {
        render(<Create setOpen={() => { }} mutate={() => { }} url="" />);

        fireEvent.change(screen.getByLabelText('First Name'), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByLabelText('Last Name'), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'john.doe@mail.com' },
        });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
            expect(screen.queryByText('Last name is required')).not.toBeInTheDocument();
            expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        });

    });
});