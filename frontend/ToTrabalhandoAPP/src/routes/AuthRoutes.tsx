import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { CreateCompany } from '../screens/CreateCompany'
import { theme } from '../global/styles/theme';
import { UserContext } from '../contexts/UserContext/userContext';
import { Home } from '../screens/Home';
import { Image } from 'react-native';

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
    </Navigator>
  )
}