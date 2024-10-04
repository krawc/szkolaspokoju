import * as React from 'react'
import { Alert } from 'react-native'
import { Divider, List } from 'react-native-paper'
import { useAppDispatch } from '../../hooks'
import { reset } from '../../redux/meditationSlice'
import { openURL } from '../../utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { SettingsParamList } from '../../types'
import { setLoggedIn, setUser, setSubscribed } from '../../redux/authSlice'
import * as SecureStore from 'expo-secure-store';


interface Props {
  navigation: StackNavigationProp<SettingsParamList, 'SettingsScreen'>
}

const Settings = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()

  const logOut = async () => {
    dispatch(setLoggedIn(false))
    dispatch(setUser({}))
    //dispatch(setSubscribed(false))
    // await SecureStore.deleteItemAsync('userName');
    // await SecureStore.deleteItemAsync('pwd');
    navigation.navigate("AuthScreen")
  }

  const openPrivacyPolicy = () => {
    try {
      openURL('https://szkolaspokoju.pl')
    } catch (error) {
      console.error(error)
    }
  }
  const clearData = () => {
    Alert.alert(
      'Usuń dane',
      'Czy na pewno chcesz usunąć wszystkie swoje dane?',
      [
        {
          text: 'Usuń Dane',
          onPress: () => dispatch(reset()),
          style: 'destructive',
        },
        {
          text: 'Cancel',
        },
      ]
    )
  }
  return (
    <>
      <List.Item title="Usuń Dane" onPress={clearData} />
      <Divider />
      <List.Item title="Polityka Prywatności" onPress={openPrivacyPolicy} />
      <Divider />
      <List.Item title="O aplikacji" onPress={() => navigation.navigate('AboutScreen')} />
      <Divider />
      <List.Item title="Wyloguj" onPress={logOut} />
      <Divider />
    </>
  )
}

export default Settings
