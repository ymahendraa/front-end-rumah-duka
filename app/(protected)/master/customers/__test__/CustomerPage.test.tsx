import { render, screen, fireEvent, act } from '@testing-library/react'

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({
        data: {
            user: { accessToken: 'test' },
        }
    }),
}))

// Create a mock function for useGetDataWithPagination
const mockUseGetDataWithPagination = jest.fn()

// Mock the useGetDataWithPagination hook with the mock function
jest.mock('@/hooks/useGetDataWithPagination', () => ({
    useGetDataWithPagination: mockUseGetDataWithPagination,
}))

describe('CustomerPage', () => {
    beforeEach(() => {
        jest.clearAllMocks() // Clear all mocks after each test case
    })
    it('renders loading component when data is loading', async () => {
        // Set the mock implementation for this test
        mockUseGetDataWithPagination.mockReturnValue({
            data: undefined,
            isLoading: true,
            mutate: jest.fn(),
        })

        await act(async () => {
            const CustomerPage = require('../page').default; // Import inside test case
            render(<CustomerPage />)
        })
        const loading = await screen.findByTestId('loading-component')
        expect(loading).toBeInTheDocument()
    })

    it('renders customer data when data is loaded', async () => {
        // Mock usePathname hook
        jest.mock('next/navigation', () => ({
            usePathname: () => '/customer',
        }))

        // Mock the API response
        const mockData = [
            // Mock your data here
            {
                "id": 1,
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com"
            }
        ]
        // Set the mock implementation for this test
        mockUseGetDataWithPagination.mockReturnValue({
            data: mockData,
            isLoading: false,
            mutate: jest.fn(),
        })

        await act(async () => {
            const CustomerPage = require('../page').default; // Import inside test case
            render(<CustomerPage />)
        })
        // Assert that the customer data is rendered
        const customerData = await screen.findByTestId('customer-data')
        expect(customerData).toBeInTheDocument()
    })

    it('opens create modal when create button is clicked', async () => {
        await act(async () => {
            const CustomerPage = require('../page').default; // Import inside test case
            render(<CustomerPage />)
        })
        // Mock the useModalState hook
        jest.mock('@/hooks/useModalState', () => ({
            useModalState: () => ({
                open: false,
                setOpen: jest.fn(),
            }),
        }))
        // Click the create button
        fireEvent.click(screen.getByTestId('create-button'))
        // Assert that the create modal is opened
        expect(screen.getByTestId('create-modal')).toBeInTheDocument()
    })

    // Add more tests for other functionality as needed
})