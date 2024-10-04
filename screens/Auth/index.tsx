import * as React from 'react'
import { ImageBackground, Alert, View, Image, TextInput } from 'react-native'
import { Divider, List, Button, Text } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setLoggedIn, setUser, setSubscribed } from '../../redux/authSlice'
import { openURL } from '../../utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthParamList } from '../../types'
import { StyleSheet } from 'react-native'
import { selectUser, selectLoggedIn } from '../../redux/selectors'
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native-paper'

interface Props {
  navigation: StackNavigationProp<AuthParamList, 'AuthScreen'>
}

const Auth = ({ navigation }: Props) => {
  
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const loggedIn = useAppSelector(selectLoggedIn)

  const [userName, setUserName] = React.useState('')
  const [pwd, setPwd] = React.useState('')
  const [err, setErr] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const getCreds = async () => {
    const username = await SecureStore.getItemAsync('userName')
    const password = await SecureStore.getItemAsync('pwd')
    console.log(username, password)
    if (username && password) {
      setUserName(username)
      setPwd(password)
    }
  }

  const login = async (userName: any, pwd: any) => {
    setLoading(true)
    var requestUrl = 'https://szkolaspokoju.pl/wp-json/jwt-auth/v1/token';
    var options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userName, password: pwd })
    }
    const res = fetch(requestUrl, options).then((response) => response.json()
      .then(async (response) => {
        console.log(response)
        if (response && response.statusCode === 200 && response.data) {
          await SecureStore.setItemAsync('userName', userName);
          await SecureStore.setItemAsync('pwd', pwd);
          setErr('')
          dispatch(setLoggedIn(true))
          dispatch(setUser(response.data))
          navigation.navigate('Main')
          //getSubscriptionStatus(response.data)
        } else {
          setErr('Podczas logowania wystąpił błąd. Spróbuj ponownie.')
        }
      }))
      .catch((hello) => setErr('Podczas logowania wystąpił błąd. Spróbuj ponownie.'))
      .finally(() => setLoading(false))
  };

  const getSubscriptionStatus = async (data: any) => {
    var requestUrl = 'https://szkolaspokoju.pl/wp-json/myplugin/v1/memberships/' + (data && data.id);
    var options = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + data.token,
      },
    }
    //console.log("subs num")

    const res = fetch(requestUrl, options).then((response) => response.json()
      .then((response) => {
        if (response) {
          console.log(response)
          dispatch(setSubscribed(response))
        } else {
          navigation.navigate('SignupScreen');
        }
      }))
      .catch((hello) => console.log(hello))
  };

  React.useEffect(() => {
    getCreds()
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/bg-10.png')} resizeMode="cover" style={styles.bg}/>
      <Image style={styles.logo} source={require('../../assets/images/logo_czarne.png')}/>
      <Text style={{marginBottom: 7, fontSize: 18}}>Witaj w Szkole Spokoju!</Text>
      <Text style={{marginBottom: 10, fontSize: 12}}>Zaloguj się, używając danych ze strony szkolaspokoju.pl.</Text>
      <TextInput
        testID="email"
        autoFocus
        keyboardType="email-address"
        placeholder="Adres e-mail"
        onChangeText={setUserName}
        value={userName}
        style={styles.textInput}
        secureTextEntry={false}
        textContentType="username"
      />
      <TextInput
        testID="password"
        autoFocus
        placeholder="Hasło"
        secureTextEntry
        value={pwd}
        onChangeText={setPwd}
        style={styles.textInput}
        textContentType="password"
      />
      <Button mode="contained" style={styles.btn} onPress={() => login(userName, pwd)} >
        <Text style={styles.btnText}>{loading ? <ActivityIndicator style={{paddingTop: 6}} color={'#fff'} /> : 'ZALOGUJ'}</Text>
      </Button>
     {err.length > 0 && <Text style={styles.err}>{err}</Text>}

    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 100,
    marginBottom: 30,
    width: 50,
    height: 50
  },
  err: {
    color: "#a00"
  },
  bg: {
    width: "100%",
    height: "100%",
    minHeight: 1200,
    position: 'absolute',
  },
  btn: {
    width: '90%',
    marginTop: 20,
    borderRadius: 15
  },
  btnText: {
    color: "#fff",
    lineHeight: 30,
    paddingHorizontal: 16
  },
  container: {
    display: 'flex',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  textInput: { 
    backgroundColor: "rgba(255,255,255,0.6)",
    marginTop: 10,
    width: '90%',
    margin: 'auto',
    fontFamily: 'Lato_300Light',
    height: 50,
    borderRadius: 15,
    borderColor: '#222',
    borderWidth: 1,
    padding: 10
  },
})


export default Auth
