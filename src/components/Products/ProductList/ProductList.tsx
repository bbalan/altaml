import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ProductListItem from '../ProductListItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTransparentNavBar } from 'src/utils/useTransparentNavBar'

const productJson = {
  image: 'https://placekitten.com/200/200',
  name: 'Cat',
  price: 200,
  description: "It's a cat.",
}

const ProductList = () => {
  useTransparentNavBar()

  const products = [...Array<typeof productJson>(10)].fill(productJson)

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView edges={['bottom']}>
        {products.map((product, i) => (
          <ProductListItem key={i} {...product} />
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    backgroundColor: '#2f7dbd',
  },
})

export default ProductList
