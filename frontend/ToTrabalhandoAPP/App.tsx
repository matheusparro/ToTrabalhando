import 'react-native-reanimated'
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Routes } from './src/screens';
import { Provider as PaperProvider } from 'react-native-paper';
//import {UsersProvider} from './src//contexts/UserContext/userContext'
import { AppRegistry } from 'react-native';
import { Background } from './src/components/Background';
import { expo as appName } from './app.json';
import {AuthProvider} from './src/contexts/auth'

export default function App() {
  return (
    
    <PaperProvider>
      {LogBox.ignoreAllLogs(true)}
      <AuthProvider>
        <Background>
        <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
        <Routes/>
        </Background>
      </AuthProvider>
    </PaperProvider>
  );
}

