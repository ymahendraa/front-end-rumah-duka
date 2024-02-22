import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginComponent from './Login'
// import { signIn } from 'next-auth/react';

// Mock next/router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

describe('LoginComponent', () => {
    it('renders without errors', () => {
        render(<LoginComponent />);
        // Add more assertions based on your component's structure
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    });

    it('renders login form', () => {
        render(<LoginComponent />)

        // Assert that the login form elements are rendered
        expect(screen.getByTestId('username')).toBeInTheDocument()
        expect(screen.getByTestId('password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
    })

    it('handles form submission', async () => {
        const signInMock = jest.fn();
        // (signIn as jest.Mock) = signInMock;
        render(<LoginComponent />)

        // Fill in the form fields
        fireEvent.change(screen.getByTestId('username'), { target: { value: 'testuser' } })
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'testpassword' } })

        // Submit the form
        fireEvent.click(screen.getByTestId('login-button'))

        // Assert that the signIn function is called with the correct credentials
        await waitFor(() => expect(signInMock).toHaveBeenCalledWith('credentials', {
            username: 'testuser',
            password: 'testpassword',
            redirect: false
        }))
    })
})