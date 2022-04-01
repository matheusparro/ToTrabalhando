import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { CreateCompany } from '../screens/CreateCompany'
import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#2f2421',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false
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