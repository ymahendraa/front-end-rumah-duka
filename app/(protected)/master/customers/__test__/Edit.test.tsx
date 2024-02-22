import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Edit from '../component/Edit';
import useSWR from 'swr';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({
        data: {
            user: { accessToken: 'test' },
        }
    }),
}))

// mock swr
jest.mock('swr', () => jest.fn());

describe('Edit', () => {
    const mockSubmitHandler = jest.fn();
    const mockSetOpen = jest.fn();
    const mockMutate = jest.fn();
    const mockUrl = 'customers';
    const mockId = '1';

    beforeEach(() => {
        jest.clearAllMocks() // Clear all mocks after each test case
    });

    it('renders the loading component when data is loading', async () => {
        (useSWR as jest.Mock).mockReturnValue({
            data: undefined,
            error: null,
            isLoading: true,
            isValidating: true,
        });
        render(
            <Edit
                submitHandler={mockSubmitHandler}
                id={mockId}
                isLoading={false}
                setOpen={mockSetOpen}
                mutate={mockMutate}
                url={mockUrl}
            />
        );
        const loading = await screen.findByTestId('loading-edit')
        expect(loading).toBeInTheDocument()
    })

    it('renders the form correctly', async () => {
        (useSWR as jest.Mock).mockReturnValue({
            data: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
            },
            error: null,
            isLoading: false,
            isValidating: false,
        });
        await act(async () => {
            render(
                <Edit
                    submitHandler={mockSubmitHandler}
                    id={mockId}
                    isLoading={false}
                    setOpen={mockSetOpen}
                    mutate={mockMutate}
                    url={mockUrl}
                />
            );
        })

        await waitFor(() => {
            expect(screen.getByLabelText('First Name')).toBeInTheDocument();
            expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByText('Save')).toBeInTheDocument();
        })
    });

    it('should show error when input is empty', async () => {
        (useSWR as jest.Mock).mockReturnValue({
            data: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
            },
            error: null,
            isLoading: false,
            isValidating: false,
        });
        await act(async () => {
            render(
                <Edit
                    submitHandler={mockSubmitHandler}
                    id={mockId}
                    isLoading={false}
                    setOpen={mockSetOpen}
                    mutate={mockMutate}
                    url={mockUrl}
                />
            );
        })

        fireEvent.change(screen.getByLabelText('First Name'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByLabelText('Last Name'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: '' },
        });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });

    it('calls submitHandler on form submission', async () => {
        (useSWR as jest.Mock).mockReturnValue({
            data: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
            },
            error: null,
            isLoading: false,
            isValidating: false,
        });
        await act(async () => {
            render(
                <Edit
                    submitHandler={mockSubmitHandler}
                    id={mockId}
                    isLoading={false}
                    setOpen={mockSetOpen}
                    mutate={mockMutate}
                    url={mockUrl}
                />
            );
        })
        fireEvent.change(screen.getByLabelText('First Name'), {
            target: { value: 'Jan' },
        });
        fireEvent.change(screen.getByLabelText('Last Name'), {
            target: { value: 'Jun' },
        });
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'jan.jun@mail.com' },
        });

        // expect the input value to be changed
        expect(screen.getByLabelText('First Name')).toHaveValue('Jan');
        expect(screen.getByLabelText('Last Name')).toHaveValue('Jun');
        expect(screen.getByLabelText('Email')).toHaveValue('jan.jun@mail.com');

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
            expect(screen.queryByText('Last name is required')).not.toBeInTheDocument();
            expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        });

        expect(mockSubmitHandler).toHaveBeenCalledWith({
            url: `${mockUrl}/${mockId}`,
            config: {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: 'Jan',
                    last_name: 'Jun',
                    email: 'jan.jun@mail.com'
                }),
            },
            setOpen: mockSetOpen,
            mutate: mockMutate,
        });
    });
});