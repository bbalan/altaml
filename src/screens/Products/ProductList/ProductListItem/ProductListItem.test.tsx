import React from 'react'
import { render } from '@testing-library/react-native'
import ProductListItem from './ProductListItem'

describe('ProductListItem', () => {
  it('renders', () => {
    const product = {
      id: '1',
      name: 'Product name',
      image: '/url/to/pic',
      price: 9000,
      description: "It's a widget.",
    }

    const component = render(<ProductListItem product={product} />)

    expect(component.getByText(product.name)).toBeTruthy()
    expect(component.getByText(`$${product.price}`)).toBeTruthy()
    expect(component.getByText(product.description)).toBeTruthy()
  })
})
