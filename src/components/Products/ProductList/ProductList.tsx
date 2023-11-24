import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import ProductListItem from '../ProductListItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTransparentNavBar } from 'src/utils/useTransparentNavBar'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  loadingStatusSelector,
  selectAll,
} from 'src/store/products'
import { AppDispatch } from 'src/store'

const ProductList = () => {
  useTransparentNavBar()

  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(selectAll)
  const loadingStatus = useSelector(loadingStatusSelector)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView edges={['bottom']}>
        {loadingStatus === 'success' &&
          products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}

        {loadingStatus === 'loading' && (
          <Text style={styles.loading}>Loading...</Text>
        )}

        {loadingStatus === 'error' && (
          <Text style={styles.error}>Error loading products</Text>
        )}
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
  loading: {
    color: 'white',
  },
  error: {
    color: 'white',
  },
})

export default ProductList
