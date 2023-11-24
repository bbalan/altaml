import React from 'react'
import { Button } from '@rneui/base'
import { StyleSheet } from 'react-native'
import { router } from 'expo-router'

const SignOutButton = () => {
  const signOut = () => {
    router.replace('/')
  }

  return (
    <Button onPress={signOut} title="Sign out" titleStyle={styles.button} />
  )
}

const styles = StyleSheet.create({
  button: {
    fontSize: 14,
  },
})

export default SignOutButton
