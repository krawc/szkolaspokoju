import * as React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { ImageBackground, StyleSheet, ScrollView, View, KeyboardAvoidingView, TextInput } from 'react-native'
import { AntDesign as Icon } from '@expo/vector-icons'
import { Button } from 'react-native-paper'

import { Screen, Text, useThemeColor } from '../../components'
import Colors from '../../constants/Colors'
import { HomeParamList, MainStackParamList } from '../../types'
import { Linking } from 'react-native'
import { useAppSelector, useMeditation, useAppDispatch } from '../../hooks'
import { selectTotalSessions, selectCategories, selectNotes } from '../../redux/selectors'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { updateNote } from '../../redux/meditationSlice'


type CompRouteProp = RouteProp<HomeParamList, 'PlayScreen'>

type CompNavProp = CompositeNavigationProp<
  StackNavigationProp<HomeParamList, 'PlayScreen'>,
  StackNavigationProp<MainStackParamList>
>

interface Props {
  navigation: CompRouteProp
  route: CompNavProp
}

const Completed = ({ route, navigation }: Props) => {
  const { id } = route.params

  const meditations = useAppSelector(selectCategories)
  const meditation = useMeditation(id, meditations)
  const dispatch = useAppDispatch()

  // const totalSessions = useAppSelector(selectTotalSessions)
  // const backgroundColor = useThemeColor({}, 'completedBackground')
  // const primaryColor = useThemeColor({}, 'completedPrimary')
  // const onPressDonate = () => {
  //   Linking.openURL('https://buycoffee.to/szkolaspokoju/?utm_source=app')
  // }
  // const onPressSkip = () => navigation.replace('Main')
  
  const notes = useAppSelector(selectNotes)

  const initialNote = notes.find(note => note.id === id)?.text || ''
  const [note, setNote] = React.useState(initialNote)

  const [btnText, setBtnText] = React.useState('Zapisz notatkę')
  const saveNote = () => {
    // Save note logic here
    if (note !== '') {

      const noteObj = {
        id,
        text: note
      }
      // Logic to save the note
      dispatch(updateNote(noteObj))
      setBtnText('Zapisano!')
    } else {
      console.log('Note is empty. Nothing to save.');
    }
  }

  return (
    <ScrollView  style={styles.screen}>
       <ImageBackground source={require('../../assets/images/blur.png')} resizeMode="cover" style={styles.bg}/>
       <View style={styles.container}>
      <Text style={styles.title}>Twoja refleksja na dziś:</Text>
      <Text style={styles.description}>
        {meditation && meditation.task}
      </Text>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
      <TextInput
        // mode='outlined'
        theme={{ colors: { primary: 'transparent', underlineColor:'transparent' }}}
        selectionColor={'blue'}
        placeholder="Zapisz notatkę dla Siebie..."
        multiline
        numberOfLines={4}
        onChangeText={(text) => setNote(text)}
        value={note}
        style={styles.input}
      />
      <Button mode="contained" onPress={saveNote} style={styles.button}>
        <Text style={styles.btnText}>{btnText}</Text>
      </Button>
      </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 50,
    marginBottom: 50,
    paddingLeft: 0,
    paddingRight: 0,
    // height: 'auto',
    width: '100%',
    padding: 0,
  },
  checkMark: {
    marginBottom: 20,
  },
  title: {
    color: Colors.light.black,
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'Lato_700Bold'
  },
  bg: {
    width: "100%",
    height: "100%",
    position: 'absolute',
  },
  container: {
    padding: 20,
  },
  description: {
    color: '#444',
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 30,
    fontFamily: 'Lato_400Regular'
  },
  button: {
    padding: 8,
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    color: "#fff"
  },
  btnText: {
    color: "#fff"
  },
  input: {
    height: 150,
    padding: 10,
    paddingTop: 15,
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    textAlignVertical: 'top',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
    display: 'flex',
    backgroundColor: 'transparent',
    outline: 'none',
    outlineStyle: 'none!important'

    // padding: 10,
  },
  skipButton: {
    borderColor: Colors.light.white,
  },
})

export default Completed
