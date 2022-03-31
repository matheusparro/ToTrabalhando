import React from 'react';
import { StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn';
import { CreateCompany } from './src/screens/CreateCompany';
import { theme } from './src/global/styles/theme'
export default function App() {
  return (
    <>
    <StatusBar 
    barStyle="light-content"
    backgroundColor="transparent"
    translucent
  />
    <CreateCompany/>
    </>
  );
}

