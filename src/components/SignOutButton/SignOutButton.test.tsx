import { render, fireEvent } from '@testing-library/react-native'
import SignOutButton from './SignOutButton'
import { router } from 'expo-router'

describe('SignOutButton', () => {
  const renderButton = () => render(<SignOutButton />).getByText('Sign out')

  it('renders', () => {
    expect(renderButton()).toBeTruthy()
  })

  test('it signs out on click', async () => {
    fireEvent.press(renderButton())
    expect(router.replace).toHaveBeenCalledWith('/')
  })
})
