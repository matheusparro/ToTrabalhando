import React from 'react';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes/';
import { CreateCompany } from './src/screens/CreateCompany';
import { theme } from './src/global/styles/theme'
import {UsersProvider} from './src//contexts/UserContext/userContext'
import { Background } from './src/components/Background';

export default function App() {
  return (
    <UsersProvider>
      <Background>
      <StatusBar 
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />
      <Routes/>
      </Background>
    </UsersProvider>
  );
}

