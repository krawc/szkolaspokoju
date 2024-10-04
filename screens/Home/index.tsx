import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import * as Linking from 'expo-linking'
import { FlatList, StyleSheet, Image, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import { Card, Paragraph, Button } from 'react-native-paper'
import DownloadButton from '../../components/DownloadButton'
import Screen from '../../components/Screen'
import { Text, useThemeColor } from '../../components/Themed'
import Colors from '../../constants/Colors'
import { MeditationItem, meditations } from '../../data/meditations'
import { useAppSelector } from '../../hooks'
import { selectFavourites, selectRecent, selectCategories, selectUser, selectFilePaths, selectSubscribed } from '../../redux/selectors'
import { HomeParamList } from '../../types'
import { useMsToTime, useAppDispatch } from '../../hooks'
import { completed, updateCategories } from '../../redux/meditationSlice'
import { setLoggedIn, setUser, setSubscribed } from '../../redux/authSlice'
import { checkDownloaded } from '../../utils'
import { useIsConnected } from 'react-native-offline'
import * as SecureStore from 'expo-secure-store';
import { AntDesign as Icon } from '@expo/vector-icons'

interface Props {
  navigation: StackNavigationProp<HomeParamList, 'HomeScreen'>
}

export default function Home({ navigation }: Props) {
  const textColor = useThemeColor({}, 'text')

  const user = useAppSelector(selectUser)
  const favourites = useAppSelector(selectFavourites)
  const recent = useAppSelector(selectRecent)
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()
  const isConnected = useIsConnected()
  const filepaths = useAppSelector(selectFilePaths)
  const subscribed = useAppSelector(selectSubscribed)


  const login = async () => {
    var requestUrl = 'https://szkolaspokoju.pl/wp-json/jwt-auth/v1/token';

    const userName = await SecureStore.getItemAsync('userName');
    const pwd = await SecureStore.getItemAsync('pwd');
    
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
        if (response && response.statusCode === 200 && response.data) {
          //enericPassword(userName, pwd);
          //console.log(response.data)
          dispatch(setLoggedIn(true))
          dispatch(setUser(response.data))
          getSubscriptionStatus(response.data)
        } else {
        }
      }))
      .catch((err) => {
        console.log(err)
      })
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
          getCategories(data.token, response);
        } else {
          navigation.navigate('SignupScreen');
        }
      }))
      .catch((hello) => console.log(hello))
  };


  console.log(subscribed)
  console.log('wefwef')

  const getCategories = async (token: any, sub: any) => {
    const userName = await SecureStore.getItemAsync('userName');
    const pwd = await SecureStore.getItemAsync('pwd');
    //console.log(userName,pwd, 'potat', user)

    if (!user) {
      //navigation.replace('AuthScreen');
      return null;
    }
    var requestUrl = 'https://szkolaspokoju.pl/wp-json/app/v1/projects-by-categories';
    var options = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    // console.log(sub.id, requestUrl)

    const res = fetch(requestUrl, options).then((response) => response.json()
      .then((response) => {
        //console.log(response)
        if (response.success === false) {
        } else {
          dispatch(updateCategories(response))
        }
      }
    ).catch((err) => {
      console.log(err)
      dispatch(updateCategories(null))
      dispatch(setUser(null))
      navigation.replace('AuthScreen')
    }))
  };

  React.useEffect(() => {
    login()
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      login()
    });
    return unsubscribe;
  }, [])

  console.log(favourites)

  const renderPopularCard = ({ item }: MeditationItem) => {
    return (
      <Card
        elevation={1}
        style={styles.card}
        onPress={() =>
          navigation.navigate('PlayScreen', {
            id: item.id,
          })
        }
      >
        <Card.Cover style={[styles.cardImage, styles.popularImage]} source={{uri: item.image}} />
        <Card.Title
          titleStyle={[styles.cardTitle, { color: textColor }]}
          subtitleStyle={styles.cardSubtitle}
          title={item.title}
          subtitle={item.subtitle}
        />
        <Card.Content style={styles.cardContent}>
          <Paragraph style={styles.cardParagraph}>{item.time} min</Paragraph>
          <DownloadButton id={item.id} style={styles.downloadButton} />
        </Card.Content>
      </Card>
    )
  }

  const renderCard = ({ item }: MeditationItem) => {

    const isDownloaded = checkDownloaded(filepaths, item)

    const release = item.release_date ? new Date(item.release_date.slice(0, 10)) : null;
    const today = new Date();
    const isReleased = release ? release <= today : true;
    //console.log(release, today, isReleased)
    const handleNavigation = () => {
      if (!isReleased) {
        Alert.alert(
          'Ta część kalendarza jest jeszcze niedostępna',
          'Nowej medytacji posłuchasz już w ' + release?.toLocaleDateString('pl-PL'),
          [{ text: 'OK' }],
          { cancelable: false }
        )
      } else if (!isDownloaded && !isConnected) {
        Alert.alert(
          "Jesteś offline",
          "Połącz się z internetem, aby odtworzyć nagranie",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      } else {
        navigation.navigate('PlayScreen', {
          id: item.id,
        })
      }
    }

    return (
      <Card
        style={{...styles.card, opacity: (!isReleased || (!isDownloaded && !isConnected)) ? 0.5 : 1}}
        onPress={handleNavigation}
      >
        <Card.Cover style={[styles.cardImage, styles.popularImage]} source={{uri: item.image}} />
        <Card.Title
          titleStyle={[styles.cardTitle, { color: textColor }]}
          subtitleStyle={styles.cardSubtitle}
          title={item.title}
          subtitle={item.subtitle}
        />
        <Card.Content style={styles.cardContent}>
          <Paragraph style={styles.cardParagraph}>{item.time} minut</Paragraph>
          <DownloadButton id={item.id} style={styles.downloadButton} />
        </Card.Content>
      </Card>
    )
  }

  // const renderCategory = (property: String, category: any) => {
  //   return (
  //     <>
  //       <Text style={styles.title}>{property}</Text>
  //       <FlatList
  //         style={styles.cards}
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         data={category}
  //         renderItem={renderCard}
  //         keyExtractor={({ id }) => id}
  //       />
  //     </>
  //   )
  // }


  // const renderCategories = ( categories : any) => Object.keys(categories).map(function(property, index) {
  //   return renderCategory(property, categories[property])
  // });


  return (
    <Screen scroll>
      <Text style={styles.greeter}>Witaj{user && ( " " + user.firstName)}!</Text>
      <TouchableOpacity onPress={() => {
        if (subscribed.settings && subscribed.categories && !subscribed.categories.includes(subscribed?.settings?.cover_category)) {
          Alert.alert(
            "Aby uzyskać dostęp do tej treści, przejdź na stronę Szkoły Spokoju.",
            '',
            [
              {
                text: "Przejdź",
                onPress: () => Linking.openURL(`https://szkolaspokoju.pl/membership-account/membership-checkout/?level=2`)
              },
              { text: "Powrót", onPress: () => console.log("OK Pressed") }
            ]
          );
        } else {
          navigation.navigate('CategoryScreen', {category: 'praktyki miesiąca'})
        } }}>
      <Image style={styles.ad} source={{uri: subscribed.settings?.cover}}/>
      </TouchableOpacity>
      <View style={styles.columns}>
        <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('CategoryScreen', {category: 'zacznij tutaj'})}>
          <Image style={styles.columnImg} source={require('../../assets/images/gate1.png')}/>
          <Text style={styles.columnText}>Zacznij Tutaj</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('OptionsScreen', {mode: 'sub'})}>
          <Image style={styles.columnImg} source={require('../../assets/images/gate2.png')}/>
          <Text style={styles.columnText}>Praktyki</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={() => navigation.navigate('OptionsScreen', {mode: 'extra'})}>
          <Image style={styles.columnImg} source={require('../../assets/images/gate3.png')}/>
          <Text style={styles.columnText}>Wiedza</Text>
        </TouchableOpacity>
      </View>
      {favourites.length > 0 && (
        <>
          <Text style={styles.greeter}>Ulubione</Text>
          <FlatList
            style={styles.cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={favourites}
            renderItem={renderCard}
            keyExtractor={({ id }) => id}
          />
        </>
      )}
      <Text style={{lineHeight: 22, fontFamily: 'Lato_400Regular', marginBottom: 30}} >{subscribed.desc_app}</Text>
      {/* {recent.length > 0 && (
        <>
          <Text style={styles.title}>Ostatnio Słuchane</Text>
          <FlatList
            style={styles.cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recent}
            renderItem={renderCard}
            keyExtractor={({ id }) => id}
          />
        </>
      )} */}
    </Screen>
  )
}

const styles = StyleSheet.create({
  tiles: {
    marginBottom: 30,
    position: 'relative'
  },
  ad: {
    width: "100%",
    height: 200,
    borderRadius: 15
  },
  greeter: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Lato_400Regular', 
  },
  tile: {
    marginVertical: 5,
    width: '100%', 
    height: 100, 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 15, 
    fontFamily: 'Lato_700Bold',
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  tileImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  tileText: {
    color: '#111',    
    textTransform: 'lowercase',
    letterSpacing: -1, 
    // fontFamily: 'Lato_400Regular', 
    fontSize: 18, 
    paddingLeft: 10
  },
  card: {
    width: 250,
    marginRight: 10,
    // backgroundColor: "#F7F6F3",
    borderWidth: 0,
  },
  cardTitle: {
    fontSize: 16,
    letterSpacing: -0.5
  },
  cardImage: {
    height: 135,
  },
  popularImage: {
    height: 250,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    letterSpacing: -0.5
  },
  cardSubtitle: {
    color: Colors.light.gray800,
    fontSize: 14,
    letterSpacing: -0.3
  },
  cardParagraph: {
    color: Colors.light.purple900,
    fontWeight: '600',
    letterSpacing: -0.3
  },
  downloadButton: {
    position: 'relative',
    top: -6,
  },
  cards: {
    marginBottom: 30,
    paddingBottom: 10
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 28,
    fontFamily: 'Lato_700Bold',
    marginBottom: 19,
    letterSpacing: -0.5
  },
  columns: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 30,
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  columnImg: {
    width: 60,
    height: 60
  },
  columnText: {
    fontFamily: 'Lato_400Regular',
    marginTop: 7
  }
})
