import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
    it('renders logo', () => {
        render(<Home />) // ARRANGE
        const logo = screen.getByAltText('Logo') // ACT
        expect(logo).toBeInTheDocument() // ASSERT
    })

    it('renders welcome message', () => {
        render(<Home />) // ARRANGE
        const welcomeMessage = screen.getByText(/Welcome to Random Management System/i) // ACT
        expect(welcomeMessage).toBeInTheDocument() // ASSERT
    })

    it('renders description', () => {
        render(<Home />) // ARRANGE
        const description = screen.getByText(/This is a base application build with NextJS for Random Management System/i) // ACT
        expect(description).toBeInTheDocument() // ASSERT
    })
})