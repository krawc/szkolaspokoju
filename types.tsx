/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type NO_PARAMS = undefined
export type RootStackParamList = {
  Root: NO_PARAMS
  NotFound: NO_PARAMS
}

export type MainStackParamList = {
  Main: NO_PARAMS
  CompletedScreen: {
    id: string
  }
  SignupScreen: NO_PARAMS
}

export type BottomTabParamList = {
  Home: NO_PARAMS
  Search: NO_PARAMS
  Settings: NO_PARAMS
}

export type HomeParamList = {
  HomeScreen: NO_PARAMS
  CategoryScreen: {
    category: string
  }
  OptionsScreen: {
    mode: string
  }
  PlayScreen: {
    id: string
  }
  CompletedScreen: {
    id: string
  }
}

export type SearchParamList = {
  SearchScreen: NO_PARAMS,
  PlayScreen: {
    id: string
  }
  CompletedScreen: {
    id: string
  }
}

export type CategoryParamList = {
  CategoryScreen: NO_PARAMS
}

export type SettingsParamList = {
  SettingsScreen: NO_PARAMS
  AboutScreen: NO_PARAMS
}

export type AuthParamList = {
  AuthScreen: NO_PARAMS
  SignupScreen: NO_PARAMS
  Main: NO_PARAMS
}
