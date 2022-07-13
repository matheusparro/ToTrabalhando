import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { CreateCompany } from '../screens/CreateCompany';
import { theme } from '../global/styles/theme';
import { ForgotPassword } from '../screens/User/forgotPassword';


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
      name="Company"
      component={CreateCompany}
      options={{
        title: 'Empresa',
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        headerTitleAlign:"left",
      }}
    />
      <Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        title: 'Esqueci a senha',
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        headerTitleAlign:"left",
      }}
    />
    
    </Navigator>
  )
}