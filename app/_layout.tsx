import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import store from 'src/store'

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          statusBarTranslucent: true,
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Provider>
  )
}
