import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import SignOutButton from 'src/components/SignOutButton'
import ProductList from 'src/screens/Products/ProductList'

const Products = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Products',
          headerShown: true,
          headerRight: SignOutButton,
        }}
      />
      <ProductList />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Products
