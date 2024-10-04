import * as React from 'react'
import { StyleSheet, ScrollView, View, Alert } from 'react-native'
import { Card,Text, Title, Paragraph, TextInput, List, Divider } from 'react-native-paper'
import { AntDesign as Icon } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'

import useColorScheme from '../../hooks/useColorScheme'
import Screen from '../../components/Screen'
import { useAppSelector, useMinutesToStatsTime, useMsToMinutes, useQuote } from '../../hooks'
import { selectStreak, selectTotalDuration, selectTotalSessions, selectCategories, selectFilePaths, selectSubscribed } from '../../redux/selectors'
import { useThemeColor } from '../../components'
import { SearchParamList } from '../../types'
import { checkDownloaded } from '../../utils'
import { useIsConnected } from 'react-native-offline'

interface Props {
  navigation: StackNavigationProp<SearchParamList, 'SearchScreen'>
}

export default function SearchScreen({ navigation }: Props) {
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

  const subscribed = useAppSelector(selectSubscribed)

  const filteredMeditations = Object.keys(meditations)
    .filter(key => subscribed.categories && subscribed.categories.includes(key))
    .reduce((obj, key) => {
      obj[key] = meditations[key];
      return obj;
    }, {});

  const searchable = Object.values(filteredMeditations).flat()
  const results = searchable.filter((item) => { return item.title.includes(query)})


  return (
    <>
      <View style={styles.v}>
        <Text style={styles.cta}>Szukaj nagrań...</Text>
        <TextInput
          testID="input"
          keyboardType="email-address"
          label="Wpisz nazwę"
          onChangeText={setQuery}
          underlineColor="transparent"
          style={styles.input}
        />
      </View>
      <ScrollView contentContainerStyle={styles.ccStyle} style={styles.results}>
        {results && results.map((item) => {
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
    alignItems: 'center',
    backgroundColor: "#fff",

  },  
  results: {
    backgroundColor: "#fff",
    paddingTop: 20,
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
    width: '95%',
    backgroundColor: '#F7F6F3'
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
})
