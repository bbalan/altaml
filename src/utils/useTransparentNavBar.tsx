import * as NavBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { Platform } from 'react-native'

// A useEffect hook that makes the bottom nav bar transparent on Android
export const useTransparentNavBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavBar.setPositionAsync('absolute')
      NavBar.setBackgroundColorAsync('#00000000')
    }
  })
}
