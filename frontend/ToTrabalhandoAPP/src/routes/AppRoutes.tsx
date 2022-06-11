import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CreateCompany } from '../screens/CreateCompany'
import { theme } from '../global/styles/theme';
import { Home } from '../screens/Home';
import { Employee } from '../screens/Employee';
import { CreateEmployee } from '../screens/Employee/createEmployee';
import { User } from '../screens/User';
import { CreateUser } from '../screens/User/createUser';
import { CreateDepartment } from '../screens/Department/CreateDepartment';
import { Department } from '../screens/Department';
import CustomHeader from '../components/CustomHeader/custoHeader';
import { CreateAppointmentConfiguration } from '../screens/AppointmentConfiguration/CreateAppointmentConfiguration';
import { AppointmentConfiguration } from '../screens/AppointmentConfiguration';
import {CustomDrawer} from '../components/CustomDrawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateAppointment } from '../screens/Appointment/CreateAppointment';

const stackNavigator = createStackNavigator()
const { Navigator, Screen} = createDrawerNavigator()

function Teste() {
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen
        name="Department"
        component={Department}
        
        options={{
          title: 'Departamento',
          headerStyle: {
            backgroundColor: theme.color.background,
          },
        
          headerTintColor: theme.color.heading,
          headerShown:true,
          header: (props) => <CustomHeader {...props} /> 
          
          
        }}
        
      />

      <stackNavigator.Screen
        name="DepartmentInsert"
        component={CreateDepartment}
        
        options={{
          title: 'Departamento',
          headerStyle: {
            backgroundColor: theme.color.background,
          },
         
          headerTintColor: theme.color.heading,
          headerShown:true
        }}
      />
    </stackNavigator.Navigator>
  )
}
export function AppRoutes() {
  return (
    <Navigator 
      drawerContent={props=> <CustomDrawer {...props}/>}
    >
    <Screen
      name="Home"
      component={Home}
      options={{
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        drawerIcon: ({focused, size}) => (
          <Ionicons
             name="md-home"
             size={size}
             color={focused ? '#700f81' : '#ccc'}
          />
       ),
      }}

    />
    <Screen
      name="Employee"
      component={Employee}
      options={{
        title: 'Funcionário',
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        drawerItemStyle: {
          display: "none",
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
      <Screen
      name="Users"
      component={User}
      options={{
        title: 'Usuários',
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        drawerIcon: ({focused, size}) => (
          <Ionicons
             name="md-person"
             size={size}
             color={focused ? '#700f81' : '#ccc'}
          />
       ),
      }}
    />

<Screen
      name="UserInsert"
      component={CreateUser}
      
      options={{
        title: 'Usuário',
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

  <Screen
      name="DepartmentDraw"
      component={Teste}
      
      options={{
        title: 'Departamento',
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerShown:false,
        headerTintColor: theme.color.heading,
        drawerIcon: ({focused, size}) => (
          <Ionicons
             name="md-business-outline"
             size={size}
             color={focused ? '#700f81' : '#ccc'}
          />
       ),
      }}
    />

  <Screen
      name="DepartmentInsert"
      component={Teste}  
      options={{
        title: 'Departamento',
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

<Screen
      name="CreateAppointmentConfiguration"
      component={CreateAppointmentConfiguration}  
      options={{
        title: 'Nova Configuração Apontamento',
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

<Screen
      name="AppointmentConfiguration"
      component={AppointmentConfiguration}
      
      options={{
        title: 'Configuração de Apontamento',
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        drawerIcon: ({focused, size}) => (
          <Ionicons
             name="md-settings-outline"
             size={size}
             color={focused ? '#700f81' : '#ccc'}
          />
       ),
      }}
    />
    <Screen
      name="CreateAppointment"
      component={CreateAppointment}
      
      options={{
        title: 'CreateAppointment',
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerTintColor: theme.color.heading,
        drawerIcon: ({focused, size}) => (
          <Ionicons
             name="md-settings-outline"
             size={size}
             color={focused ? '#700f81' : '#ccc'}
          />
       ),
      }}
    />
    

    
  </Navigator>
  )
}