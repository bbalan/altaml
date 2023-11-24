import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ProductListItem from '../ProductListItem'
import { SafeAreaView } from 'react-native-safe-area-context'

const productJson = {
  image: 'https://placekitten.com/200/200',
  name: 'Cat',
  price: 200,
  description: "It's a cat.",
}

const ProductList = () => {
  const products = [...Array<typeof productJson>(10)].fill(productJson)

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView>
        {products.map((product, i) => (
          <ProductListItem key={i} {...product} />
        ))}
      </ScrollView>
    </SafeAreaView>
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
