import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import BottomTabNavigator from './BottomTabNavigator'
import CompletedScreen from '../screens/Completed'
import AuthScreen from '../screens/Auth'
import SignupScreen from '../screens/Auth/SignupScreen'
import HomeScreen from '../screens/Home'

import Colors from '../constants/Colors'
import { MainStackParamList } from '../types'

const Stack = createStackNavigator<MainStackParamList>()

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
          headerBackTitle: 'Powrót',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Colors.light.white,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerShown: false,
          headerBackTitle: 'Powrót',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Colors.light.white,
        }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    color: Colors.light.white,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.light.primary,
  },
})
