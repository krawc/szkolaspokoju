import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import useSetNavigationBarColor from './hooks/useSetNavigationBarColor'
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { NetworkProvider, useIsConnected } from 'react-native-offline';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Lato_400Regular',
      
    },
    medium: {
      fontFamily: 'Lato_700Bold',
      
    },
    light: {
      fontFamily: 'Lato_300Light',
      
    },
    thin: {
      fontFamily: 'Lato_300Light',
      
    },
  },
  ios: {
    regular: {
      fontFamily: 'Lato_400Regular',
      
    },
    medium: {
      fontFamily: 'Lato_700Bold',
      
    },
    light: {
      fontFamily: 'Lato_300Light',
      
    },
    thin: {
      fontFamily: 'Lato_300Light',
      
    },
  },
  android: {
    regular: {
      fontFamily: 'Lato_400Regular',
      
    },
    medium: {
      fontFamily: 'Lato_700Bold',
      
    },
    light: {
      fontFamily: 'Lato_300Light',
      
    },
    thin: {
      fontFamily: 'Lato_300Light',
    },
  }
};

const App = () => {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  useSetNavigationBarColor()
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <PaperProvider theme={{  ...DefaultTheme,
              roundness: 2,
              fonts: configureFonts(fontConfig),
              colors: {
                ...DefaultTheme.colors,
                primary: '#f0a78d',
              }}}>
              <NetworkProvider>
                <Navigation />
                <StatusBar />
              </NetworkProvider>
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default gestureHandlerRootHOC(App)
