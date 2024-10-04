import * as React from 'react'
import { ImageBackground, Alert, View, Image, Linking } from 'react-native'
import { Divider, List, TextInput, Button, Text } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setLoggedIn, setUser, setSubscribed } from '../../../redux/authSlice'
import { openURL } from '../../../utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthParamList } from '../../../types'
import { StyleSheet } from 'react-native'
import { selectUser } from '../../../redux/selectors'

interface Props {
  navigation: StackNavigationProp<AuthParamList, 'SignupScreen'>
}

const Auth = ({ navigation }: Props) => {
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/bg-40.png')} resizeMode="cover" style={styles.bg}/>
      <View style={styles.btnCont}>
        <Button mode="contained" style={styles.btn} onPress={ () => Linking.openURL('https://szkolaspokoju.pl/subskrypcja')} >
          <Text style={styles.btnText}>Przejdź do Subskrypcji</Text>
        </Button>
        <Button mode="text" style={styles.secondbtn}  >
          <Text onPress={() => navigation.navigate('AuthScreen')} style={styles.btnTextTwo}>Wróć do logowania</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100
  },
  err: {
    color: "#a00"
  },
  btnCont: {
    display: 'flex',
    flexDirection: 'column',
  }, 
  btn: {
    marginTop: 400,
    backgroundColor: "#f0a78d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '90%',
    letterSpacing: 0,
    borderRadius: 15,
    borderWidth: 0
  },
  secondbtn: {
    paddingVertical: 8,
  },
  bg: {
    width: "100%",
    height: "100%",
    position: 'absolute',
  },
  btnText: {
    color: "#fff",
  },
  btnTextTwo: {
    color: "#000",
  },
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
  textInput: { 
    borderColor: '#222',
    marginTop: 10,
    width: '90%',
    margin: 'auto',
  },
})


export default Auth
