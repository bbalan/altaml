import { KeyboardAvoidingView, Text, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useTransparentNavBar } from 'src/utils/useTransparentNavBar'
import { isValidEmail } from 'src/utils/isValidEmail'
import { styles } from './styles'

/**
 * The initial login page.
 */
const SignIn = () => {
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
        'https://raw.githubusercontent.com/bbalan/altaml/master/assets/json/user.json',
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

export default SignIn
