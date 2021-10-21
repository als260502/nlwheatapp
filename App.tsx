import React from 'react';
import { Home } from './src/screens/Home';

import { AuthProvider } from './src/hooks/useAuth'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import AppLoading from 'expo-app-loading'

import { StatusBar } from 'expo-status-bar'

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <AuthProvider>
      <StatusBar
        translucent
        backgroundColor='transparent'
        style='light'

      />
      <Home />
    </AuthProvider>
  );
}


