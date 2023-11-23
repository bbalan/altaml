import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

/**
 * Validate the customer's email.
 * We use a simple validation regex here and rely on a confirmation email for more robust validation.
 */
function isValidEmail(str: string) {
  return /^\S+@\S+\.\S+$/.test(str)
}

/**
 * The initial login page.
 */
function Index() {
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [didBlurEmailWithErrors, setDidBlurEmailWithErrors] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  function validateEmail(str: string) {
    const isEmailValid = isValidEmail(str)
    setIsEmailValid(isEmailValid)
  }

  function onBlurEmail() {
    setDidBlurEmailWithErrors(!isEmailValid)
  }

  const showErrorMessage = !isEmailValid && didBlurEmailWithErrors

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <View style={[styles.container]}>
          <View style={styles.loginBox}>
            <View style={styles.header}>
              <Text style={styles.titleText}>Welcome</Text>
              <Text style={styles.subtitleText}>
                Please sign in to continue.
              </Text>
            </View>

            <View style={styles.form}>
              <Input
                style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={validateEmail}
                onBlur={onBlurEmail}
                errorMessage={showErrorMessage && 'Please enter a valid email.'}
              />
              <Input placeholder="Password" secureTextEntry />
              <Button>Submit</Button>
            </View>
          </View>
        </View>

        <StatusBar style="dark" translucent={true} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: '100%',
    maxWidth: 300,
    maxHeight: '95%',
    backgroundColor: 'white',
    padding: 24,
    paddingVertical: 48,

    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    marginHorizontal: 12,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
  },
  subtitleText: {},
  form: {
    marginTop: 48,
  },
  input: {},
})

export default Index
