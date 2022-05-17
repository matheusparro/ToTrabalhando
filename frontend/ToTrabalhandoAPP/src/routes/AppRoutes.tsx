import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CreateCompany } from '../screens/CreateCompany'
import { theme } from '../global/styles/theme';
import { Home } from '../screens/Home';
import { Employee } from '../screens/Employee';
import { CreateEmployee } from '../screens/Employee/createEmployee';


//const { Navigator, Screen } = createStackNavigator()
const { Navigator, Screen} = createDrawerNavigator()
export function AppRoutes() {
  return (
    <Navigator>
    <Screen
      name="Home"
      component={Home}
      options={{
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        headerTitleAlign:"left",
      }}
    />
    <Screen
      name="Emloyee"
      component={Employee}
      options={{
        title: 'Funcionário',
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
      }}
    />
    <Screen
      name="EmloyeeInsert"
      component={CreateEmployee}
      
      options={{
        title: 'Funcionário',
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        drawerItemStyle: {
          display: "none",
        },
        headerTintColor: theme.color.heading,
        headerShown:true
      }}
    />
    
  </Navigator>
  )
}