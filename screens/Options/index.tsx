import * as React from 'react'
import { StyleSheet, ScrollView, View, Image, FlatList, Alert, TouchableOpacity } from 'react-native'
import { Card,Text, Title, Paragraph, TextInput, List, Divider } from 'react-native-paper'
import { AntDesign as Icon } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import useColorScheme from '../../hooks/useColorScheme'
import Screen from '../../components/Screen'
import { useAppSelector, useMinutesToStatsTime, useMsToMinutes, useQuote } from '../../hooks'
import { selectStreak, selectTotalDuration, selectTotalSessions, selectCategories, selectFilePaths, selectSubscribed, selectUser } from '../../redux/selectors'
import { useThemeColor } from '../../components'
import { HomeParamList, MainStackParamList, CategoryParamList } from '../../types'
import { checkDownloaded } from '../../utils'
import { useIsConnected } from 'react-native-offline'

type PlayRouteProp = RouteProp<HomeParamList, 'OptionsScreen'>

type PlayNavProp = CompositeNavigationProp<
  StackNavigationProp<HomeParamList, 'PlayScreen'>,
  StackNavigationProp<MainStackParamList>
>
interface Props {
  navigation: PlayNavProp
  route: PlayRouteProp
}

export default function OptionsScreen({ route, navigation }: Props) {

  const { mode } = route.params

  //Component key will redraw calendars color switch issue.
  const colorScheme = useColorScheme()
  const totalSessions = useAppSelector(selectTotalSessions)
  const totalDuration = useAppSelector(selectTotalDuration)
  const streak = useAppSelector(selectStreak)
  const totalMinutes = useMsToMinutes(totalDuration)
  const listenedStat = useMinutesToStatsTime(totalMinutes)
  const primary = useThemeColor({}, 'primary')
  const [manualEntryTimestamp, setManualEntryTimestamp] = React.useState<number>()
  const { quote, author } = useQuote()
  const [query, setQuery] = React.useState('')
  const isConnected = useIsConnected()
  const meditations = useAppSelector(selectCategories)
  const filepaths = useAppSelector(selectFilePaths)

  const user = useAppSelector(selectUser)


  const subscribed = useAppSelector(selectSubscribed)

  console.log('subscribed')
  console.log(subscribed)


  const [subKeys, setSubKeys] = React.useState([
    { sub: 2, title: 'praktyki miesiąca', color: '#ffde59', path: require('../../assets/btns/1.png') }, 
    { sub: 2,title: 'medytacje', color: '#ebc5c4', path: require('../../assets/btns/2.png') }, 
    { sub: 2,title: 'praktyki oddechowe', color: '#47996b', path:('../../assets/btns/3.png') }, 
    { sub: 2,title: 'relaksacje', color: '#c898bd', path: require('../../assets/btns/4.png') }, 
    { sub: 2,title: 'regeneranki', color: '#6bbec2', path: require('../../assets/btns/5.png') }, 
  ])
  const [premiumKeys, setPremiumKeys] = React.useState([])
  const [subIds, setSubIds] = React.useState([2,3,4,5,6])

  const getPremiumKeys =  async () => {
    var requestUrl = 'https://szkolaspokoju.pl/wp-json/myplugin/v1/extras/';
    var options = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + user.token,
      },
    }
    //console.log("subs num")

    const res = fetch(requestUrl, options).then((response) => response.json()
      .then((response) => {
        if (response) {
          console.log(response)
          setSubIds(response.sub_ids)
          setSubKeys(response.sub)
          setPremiumKeys(response.extras)
        } else {
          //navigation.navigate('SignupScreen');
        }
      }))
      .catch((hello) => console.log(hello))
  }

  // console.log(premiumKeys)
  // console.log('premiumKeys')


  React.useEffect(() => {
    getPremiumKeys()
  },[])

  const subIdsAsNumbers = subIds.map(Number);
  const subscribedCategoriesAsNumbers = subscribed.ids && subscribed.ids.map(Number);
  const sharesElement = subIdsAsNumbers.some(id => subscribedCategoriesAsNumbers && subscribedCategoriesAsNumbers.includes(id));

  console.log(subIdsAsNumbers, subscribedCategoriesAsNumbers, sharesElement)

  const renderTile = ({ item, index }: any) => {

    //getCategories()

    const subd = (mode === 'extra' && subscribed && subscribed.categories.includes(item.title)) || (mode === 'sub' && sharesElement);

    return (
      <TouchableOpacity 
        onPress={() => {
          if (!subd) {
            Alert.alert(
              item.description ? "Opis Pakietu:" : "Aby uzyskać dostęp do tej treści, przejdź na stronę Szkoły Spokoju.",
              item.description,
              [
                {
                  text:  item.description ? "Przejdź do zakupu" : "Przejdź do Subskrypcji",
                  onPress: () => Linking.openURL(`https://szkolaspokoju.pl/membership-account/membership-checkout/?level=${item.sub}`)
                },
                { text: "Powrót", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else {
            navigation.navigate('CategoryScreen', {
              category: item.title,
            })
          }
        }} 
        style={{...styles.tile, opacity: subd ? 1 : 0.5}}
        >  
            {typeof item.path === 'string' && item.path.includes('https') ? 
              <Image style={styles.tileImg} source={{uri: item.path}} /> : 
              <Image style={styles.tileImg} source={item.path} />
            }
            <Text style={styles.tileText}>{item.title}</Text>
            {!subd && item.price && <Icon name="lock" size={30} color="#000" />}
            {!subd && item.price && <Text style={styles.price}>{item.price} PLN</Text>}
      </TouchableOpacity>
    )
  }

  const CustomImageTile = (props: any) => {
    return(
      <Image style={styles.tileImg} source={props.path}/>
    )
  }

  


  return (
    <>
      <View style={styles.v}>
        <Text style={styles.title}>
          {mode === 'sub' ? 
        sharesElement ? 'Praktyki' : <>Praktyki <Icon name="lock" size={30} color="#000" /> <Text style={styles.price}>35 PLN / miesiąc</Text></>
        : 'Wiedza (kursy / warsztaty)'
        }
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.ccStyle} style={styles.results}>
        <Text style={styles.desc}>
          {
            mode === 'sub' ? 
            subscribed.desc_prac
            : mode === 'extra' ? 
            subscribed.desc_know
            : 'Witaj w szkole spokoju'
          }
        </Text>
        {mode === 'sub' ?
          <>
          {/* <Text style={styles.greeter}>Twoje nagrania:</Text> */}
        {subKeys.map((item, index) => 
          renderTile({ item, index })
        )}
        </> : <></>}
        {mode === 'extra' ?
          <>
        {premiumKeys.map((item, index) => 
          renderTile({ item, index })
        )}
        </> : <></>}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  v: {
    display: 'flex',
  },  
  results: {
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  ccStyle: {
    display: 'flex',
    justifyContent: 'center'
  },
  price: {
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5
  },
  cards: {
    marginBottom: 30,
  },
  cta: {
    fontFamily: 'Lato_300Light',
    textAlign: 'center',
    fontSize: 24,
    margin: 20,

  },
  input: {
    width: '95%'
    
  },
  card: {
    width: 150,
    marginRight: 10,
    textAlign: 'center',
  },
  quoteContainer: { marginRight: 10, marginBottom: 30 },
  quoteCard: {
    width: '100%',
  },
  quoteTitle: {
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 28,
    fontFamily: 'Lato_700Bold',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    letterSpacing: -0.5,
    paddingHorizontal: 20
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
  tiles: {
    marginBottom: 30,
    position: 'relative'
  },
  desc: {
    fontSize: 14,
    paddingBottom: 30,
    lineHeight: 22,
    backgroundColor: '#fff'
  }
})
