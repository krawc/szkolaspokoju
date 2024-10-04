import { AntDesign as Icon } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Paragraph, Button } from 'react-native-paper'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import HomeScreen from '../screens/Home'
import PlayScreen from '../screens/Play'
import CompletedScreen from '../screens/Completed'
import OptionsScreen from '../screens/Options'
import SettingsScreen from '../screens/Settings'
import SearchScreen from '../screens/Search'
import CategoryScreen from '../screens/Category'
import AboutPage from '../screens/Settings/About'
import { BottomTabParamList, HomeParamList, SettingsParamList, SearchParamList } from '../types'
import { Text } from '../components'
import { Image } from 'react-native'
import { selectUser } from '../redux/selectors'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useIsConnected } from 'react-native-offline'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const user = useAppSelector(selectUser)
  console.log('bottom nav')
  return (
    <BottomTab.Navigator
      initialRouteName={"Home"}
      tabBarOptions={{labelPosition: "below-icon"}}
      screenOptions={{ tabBarHideOnKeyboard: false, tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarLabel: () => <TabBarText>Szkoła Spokoju</TabBarText>,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarLabel: () => <TabBarText>Szukaj</TabBarText>,
          tabBarIcon: ({ color }) => <TabBarIcon name="search1" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarLabel: () => <TabBarText>Ustawienia</TabBarText>,
          tabBarIcon: ({ color }) => <TabBarIcon name="setting" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
  return <Icon size={22} style={styles.tabBarIcon} {...props} />
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarText(props: any) {
  return <Text style={styles.tabBarText}>{props.children}</Text>
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>()

function TabOneLogo(props: any) {
  const isConnected = useIsConnected()
  return <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>
}

function TabOneNavigator() {
  const isConnected = useIsConnected()
  console.log('tab one nav')

  return (
    <HomeStack.Navigator>
      <HomeStack.Group
        screenOptions={{
          headerStyle: {...styles.header, height: 100},
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerLeft: () => {return null},
            headerStyle: {...styles.header},
            headerTitleStyle: styles.headerTitle,
            headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>
          }}
        />
        <HomeStack.Screen
          name="OptionsScreen"
          component={OptionsScreen}
          options={{
            headerBackTitle: 'Powrót',
            headerStyle: {...styles.header},
            headerTitleStyle: styles.headerTitle,
            headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>
          }}
        />
        <HomeStack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{
            headerBackTitle: 'Powrót',
            headerStyle: {...styles.header},
            headerTitleStyle: styles.headerTitle,
            headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>
          }}
        />
        <HomeStack.Screen
          name="PlayScreen"
          component={PlayScreen}
          options={({route, navigation}) => {
            // headerShown: false,
            return {
            headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>,
            headerStyle: {...styles.header},
            headerBackTitle: 'Powrót',
            headerLeft: () => <Icon 
                onPress={() => navigation.goBack()} 
                name="left" 
                size={25} 
                style={{marginLeft: '10%'}}
              />,
            headerRight: () => <Icon 
              onPress={() => navigation.navigate('CompletedScreen', { id: route.params.id })} 
              name="edit" 
              size={25} 
              style={{marginRight: '10%'}}
            />,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: 'transparent',
            }
          }}
        />
        <HomeStack.Screen
        name="CompletedScreen"
        component={CompletedScreen}
        options={({route, navigation}) => {
          // headerShown: false,
          return {
          headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>,
          headerStyle: {...styles.header},
          headerBackTitle: 'Powrót',
          headerLeft: () => <Icon 
              onPress={() => navigation.navigate('PlayScreen', { id: route.params.id })} 
              name="left" 
              size={25} 
              style={{marginLeft: 15}}
            />,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: 'transparent',
          }
        }}
      />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

const SearchStack = createStackNavigator<SearchParamList>()

function SearchNavigator() {
  const isConnected = useIsConnected()
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerLeft: () => {return null},
          headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>,
          headerStyle: {...styles.header},
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <SearchStack.Screen
          name="PlayScreen"
          component={PlayScreen}
          options={{
            headerBackTitle: 'Powrót',
            headerStyle: {...styles.header},
            headerTitleStyle: styles.headerTitle,
            headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>,
          }}
        />
      <HomeStack.Screen
        name="CompletedScreen"
        component={CompletedScreen}
        options={({route, navigation}) => {
          // headerShown: false,
          return {
                      // headerShown: false,
          headerTitle: () => <Image source={require('../assets/images/logo_czarne.png')} style={{...styles.headerLogo, marginTop: 0}}></Image>,
          headerStyle: {...styles.header},
          headerBackTitle: 'Powrót',
          headerLeft: () => <Icon 
              onPress={() => navigation.navigate('PlayScreen', { id: route.params.id })} 
              name="left" 
              size={25} 
              style={{marginLeft: 15}}
            />,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: 'transparent',
          }
        }}
      />
    </SearchStack.Navigator>
  )
}

const SettingsStack = createStackNavigator<SettingsParamList>()

function SettingsNavigator() {
  const isConnected = useIsConnected()
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerLeft: () => {return null},
          headerTitle: 'Ustawienia',
          headerStyle: {...styles.header},
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <SettingsStack.Screen
        name="AboutScreen"
        component={AboutPage}
        options={{
          headerLeft: () => {return null},
          headerTintColor: Colors.light.white,
          headerTitle: 'About',
          headerStyle: {...styles.header},
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </SettingsStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    color: Colors.light.black,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.light.white,
    height: 90
  },
  tabBarIcon: {
    marginBottom: -5,
  },
  tabBarText: {
    marginBottom:  5,
    fontSize: 12,
    fontFamily: 'Lato_300Light'
  },
  headerLogo: {
    height: 40,
    width: 40,
    left: 0
  }
})
