import { StatusBar } from 'expo-status-bar'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

/**
 * Validate the customer's email.
 * We use a simple validation regex here and rely on a confirmation email for more robust validation.
 */
function isValidEmail(str: string) {
  return /^\S+@\S+\.\S+$/.test(str)
}

// KeyboardAvoidingView is only required on iOS
function Wrapper({ children }) {
  if (Platform.OS !== 'ios') return <>{children}</>

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  )
}

/**
 * The initial login page.
 */
function Index() {
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [didBlurEmailWithErrors, setDidBlurEmailWithErrors] = useState(false)

  const validateEmail = (str: string) => setIsEmailValid(isValidEmail(str))
  const onBlurEmail = () => setDidBlurEmailWithErrors(!isEmailValid)

  const onSubmit = () => {}

  const showErrorMessage = !isEmailValid && didBlurEmailWithErrors

  return (
    <Wrapper>
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <View style={[styles.container]}>
          <View style={styles.loginBox}>
            <View style={styles.header}>
              <Text style={styles.titleText}>Welcome</Text>
              <Text>Please sign in to continue.</Text>
            </View>

            <View style={styles.form}>
              <Input
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={validateEmail}
                onBlur={onBlurEmail}
                errorMessage={
                  showErrorMessage && 'Please enter your email address.'
                }
                errorStyle={styles.inputError}
              />
              <Input placeholder="Password" secureTextEntry />
              <Button onPress={onSubmit}>Submit</Button>
            </View>
          </View>
        </View>

        <StatusBar style="dark" translucent={true} />
      </SafeAreaView>
    </Wrapper>
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
  form: {
    marginTop: 48,
  },
  inputError: {
    marginLeft: 0,
  },
})

export default Index
