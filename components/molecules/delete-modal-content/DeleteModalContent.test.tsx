import { render, screen, fireEvent } from '@testing-library/react'
import DeleteModalContent from './index'

describe('DeleteModalContent', () => {
    const mockName = 'Test Name'
    const mockSetOpen = jest.fn()
    const mockIsLoading = false
    const mockDeleteHandler = jest.fn()

    beforeEach(() => {
        render(
            <DeleteModalContent
                name={mockName}
                setOpen={mockSetOpen}
                isLoading={mockIsLoading}
                deleteHandler={mockDeleteHandler}
            />
        )
    })

    it('renders the delete confirmation message with the provided name', () => {
        // const deleteConfirmationMessage = screen.getByText(`Are you sure want to delete ${mockName}?`)
        // expect(deleteConfirmationMessage).toBeInTheDocument()
        const deleteConfirmationMessage = screen.getByText((content, node) => {
            const hasText = (node: HTMLElement) => node.textContent === `Are you sure want to delete ${mockName}?`;
            const nodeHasText = hasText(node as HTMLElement);
            const childrenDontHaveText = node ? Array.from(node.children).every(
                child => !hasText(child as HTMLElement)
            ) : true;

            return nodeHasText && childrenDontHaveText;
        });
        expect(deleteConfirmationMessage).toBeInTheDocument();
    })

    it('calls the deleteHandler function when "Yes" button is clicked', () => {
        const yesButton = screen.getByText('Yes')
        fireEvent.click(yesButton)
        expect(mockDeleteHandler).toHaveBeenCalledTimes(1)
    })

    it('calls the setOpen function with false when "No" button is clicked', () => {
        const noButton = screen.getByText('No')
        fireEvent.click(noButton)
        expect(mockSetOpen).toHaveBeenCalledWith(false)
    })

    it('renders the loading spinner when isLoading is true', () => {
        render(
            <DeleteModalContent
                name={mockName}
                setOpen={mockSetOpen}
                isLoading={true}
                deleteHandler={mockDeleteHandler}
            />
        )
        const loadingSpinner = screen.getByTestId('loading-spinner')
        expect(loadingSpinner).toBeInTheDocument()
    })
})