import * as React from 'react'
import { StyleSheet, ScrollView, View, Alert } from 'react-native'
import { Card,Text, Title, Paragraph, TextInput, List, Divider, Button } from 'react-native-paper'
import { AntDesign as Icon } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'

import useColorScheme from '../../hooks/useColorScheme'
import Screen from '../../components/Screen'
import { useAppSelector, useMinutesToStatsTime, useMsToMinutes, useQuote } from '../../hooks'
import { selectStreak, selectTotalDuration, selectTotalSessions, selectCategories, selectFilePaths, selectSubscribed } from '../../redux/selectors'
import { useThemeColor } from '../../components'
import { HomeParamList, MainStackParamList, CategoryParamList } from '../../types'
import { checkDownloaded } from '../../utils'
import { useIsConnected } from 'react-native-offline'

type PlayRouteProp = RouteProp<HomeParamList, 'CategoryScreen'>

type PlayNavProp = CompositeNavigationProp<
  StackNavigationProp<HomeParamList, 'PlayScreen'>,
  StackNavigationProp<MainStackParamList>
>
interface Props {
  navigation: PlayNavProp
  route: PlayRouteProp
}

export default function CategoryScreen({ route, navigation }: Props) {

  const { category } = route.params

  const subscribed = useAppSelector(selectSubscribed)

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

  console.log(meditations["praktyki miesiąca"])



  return (
    <>
      <View style={styles.v}>
        <Text style={styles.title}>{category}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.ccStyle} style={styles.results}>
        {category === 'zacznij tutaj' && <Text style={styles.desc}>{subscribed.desc_free}</Text>}
        {meditations && meditations[category] && meditations[category].map((item) => {
          const isDownloaded = checkDownloaded(filepaths, item)
          const release = item.release_date ? new Date(item.release_date.slice(0, 10)) : null;
          const today = new Date();
          const isReleased = release ? release <= today : true;
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
          return (<><List.Item style={{opacity: (!isReleased || (!isDownloaded && !isConnected)) ? 0.5 : 1}} onPress={handleNavigation} title={item.title}></List.Item><Divider></Divider></>)
        })}
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
    paddingLeft: 5
  },
  ccStyle: {
    display: 'flex',
    justifyContent: 'center'
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
  desc: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingBottom: 30,
    lineHeight: 22,
    backgroundColor: '#fff'
  }
})
