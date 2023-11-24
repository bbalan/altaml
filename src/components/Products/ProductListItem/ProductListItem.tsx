import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
  name: string
  price: number
  description?: string
  image?: string
}

const ProductListItem = ({ name, price, description, image }: Props) => {
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
    flexDirection: 'row',

    backgroundColor: 'white',
    marginHorizontal: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    marginLeft: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  name: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  price: {
    fontSize: 16,
  },
  description: {
    overflow: 'hidden',
    flexGrow: 1,
  },
})

export default ProductListItem
