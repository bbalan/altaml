import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
