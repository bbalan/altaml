import React from 'react'
import ProductList from './ProductList'
import { renderWithProviders } from 'src/utils/testUtils'

describe('ProductList', () => {
  it('renders loading state', () => {
    const component = renderWithProviders(<ProductList />)
    expect(component.getByText('Loading...')).toBeTruthy()
  })

  it('renders success state with products', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify([
          {
            id: 1,
            name: 'Product',
            price: 9000,
          },
        ]),
      ),
    )

    const component = renderWithProviders(<ProductList />)

    expect(await component.findByText('Product')).toBeTruthy()
    expect(await component.findByText('$9000')).toBeTruthy()
  })

  it('renders error state', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(null)

    const component = renderWithProviders(<ProductList />)

    expect(await component.findByText('Error loading products')).toBeTruthy()
  })
})
