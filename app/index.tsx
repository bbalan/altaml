import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useTransparentNavBar } from 'src/utils/useTransparentNavBar'

/**
 * Validate the customer's email.
 * We use a simple validation regex here and rely on a confirmation email for more robust validation.
 */
const isValidEmail = (str: string) => /^\S+@\S+\.\S+$/.test(str)

/**
 * The initial login page.
 */
const Index = () => {
  useTransparentNavBar()

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Store form values so we can send them on submit.
  const [email, setEmail] = useState('user@domain.com')
  const [password, setPassword] = useState('password')

  // Store validation errors.
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isLoginValid, setIsLoginValid] = useState(true)
  const [isLoginRequestSuccess, setIsLoginRequestSuccess] = useState(true)

  const [didBlurEmailWithErrors, setDidBlurEmailWithErrors] = useState(false)

  const onChangeEmail = (str: string) => {
    setEmail(str)
    setIsEmailValid(isValidEmail(str))
  }

  const onBlurEmail = () => setDidBlurEmailWithErrors(!isEmailValid)

  // Make a request to a mock sign-in endpoint, which returns user data.
  // In reality, this would return status 401 or 200, plus user data on success.
  const onSubmit = async () => {
    onBlurEmail()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/bbalan/altaml/master/assets/user.json',
      )
      const json = await response.json()

      setIsLoginRequestSuccess(true)

      const isLoginValid = email === json.email && password === json.password
      setIsLoginValid(isLoginValid)

      if (isLoginValid) router.replace('/products')
    } catch (error) {
      console.error(error)
      setIsLoginRequestSuccess(false)
    }

    setIsSubmitting(false)
  }

  const showEmailErrorMessage = !isEmailValid && didBlurEmailWithErrors
  const showLoginErrorMessage = !isLoginValid || !isLoginRequestSuccess

  let loginErrorMessage = ''
  if (!isLoginRequestSuccess)
    loginErrorMessage = 'Error while logging in. Please try again later.'
  else if (!isLoginValid) loginErrorMessage = 'Email or password is incorrect.'

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <View style={[styles.container]}>
          <View style={styles.loginBox}>
            <View style={styles.header}>
              <Text style={styles.titleText}>Welcome</Text>
              <Text style={styles.signin}>Please sign in to continue.</Text>
              <Text>Email: user@domain.com</Text>
              <Text>Password: password</Text>
            </View>

            <View style={styles.form}>
              <Input
                value={email}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={onChangeEmail}
                onBlur={onBlurEmail}
                errorMessage={
                  showEmailErrorMessage && 'Please enter your email address.'
                }
                errorStyle={styles.inputError}
              />
              <Input
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
                errorMessage={showLoginErrorMessage && loginErrorMessage}
                errorStyle={styles.inputError}
                secureTextEntry
              />

              <View style={styles.button}>
                <Button onPress={onSubmit} disabled={isSubmitting}>
                  Submit
                </Button>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2f7dbd',
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
    fontSize: 30,
    marginBottom: 12,
  },
  signin: {
    marginBottom: 12,
  },
  form: {
    marginTop: 24,
  },
  inputError: {
    marginLeft: 0,
  },
  button: {
    marginTop: 12,
    marginHorizontal: 10,
  },
})

export default Index
