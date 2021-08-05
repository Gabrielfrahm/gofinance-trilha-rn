import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';

// import { AppRoutes } from './src/routes/app.routes';
// import { SignIn } from './src/screens/SignIn';
import { AuthProvider , useAuth } from './src/hooks/auth';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {isLoading} = useAuth();

  // enquanto as fontes nao sao carregadas
  if (!fontsLoaded || isLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>

        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>

    </ThemeProvider>
  );
}
