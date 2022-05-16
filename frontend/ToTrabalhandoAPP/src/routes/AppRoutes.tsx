import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { CreateCompany } from '../screens/CreateCompany'
import { theme } from '../global/styles/theme';
import { Home } from '../screens/Home';


const { Navigator, Screen } = createStackNavigator()
export function AppRoutes() {
  return (
    <Navigator>
    <Screen
      name="Home"
      component={Home}
      options={{
        title: 'Bem vindo Admin',
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        headerShown:true,
        detachPreviousScreen:false,
        headerLeft: ()=> false,
        headerTitleAlign:"left",
      }}
    />
    <Screen
      name="CreateCompany"
      component={CreateCompany}
      options={{
        title: 'Cadastrar Empresa',
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        headerShown:true
      }}
    />
    
  </Navigator>
  )
}