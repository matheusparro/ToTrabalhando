import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'


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
    </Navigator>
  )
}