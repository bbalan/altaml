import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Product } from 'src/store/products'

interface Props {
  product: Product
}

const ProductListItem = ({ product }: Props) => {
  const { name, image, price, description } = product

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.text}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    marginHorizontal: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    backgroundColor: 'white',
    width: '100%',
    height: 250,
    borderRadius: 4,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  text: {
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  name: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 12,
  },
  price: {
    fontSize: 16,
    top: 4,
  },
  description: {
    overflow: 'hidden',
    flexGrow: 1,
  },
})

export default ProductListItem
