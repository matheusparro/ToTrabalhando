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
import { Profile } from '../screens/User/Profile';
import { useAuth } from '../contexts/auth';

const stackNavigator = createStackNavigator()
const { Navigator, Screen} = createDrawerNavigator()

function DepartamentStack() {
  const { signOut,user } = useAuth()
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
function UserStack() {
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen
        name="Users"
        component={User}
        
        options={{
          title: 'Usuários',
          headerStyle: {
            backgroundColor: theme.color.background,
          },
        
          headerTintColor: theme.color.heading,
          headerShown:true,
          header: (props) => <CustomHeader {...props} /> 
          
          
        }}
        
      />

      <stackNavigator.Screen
        name="UserInsert"
        component={CreateUser}
        
        options={{
          title: 'Usuário',
          headerStyle: {
            backgroundColor: theme.color.background,
          },
         
          headerTintColor: theme.color.heading,
          headerShown:true
        }}
      />
       <stackNavigator.Screen
        name="EmloyeeInsert"
        component={CreateEmployee}
        
        options={{
          title: 'Funcionário',
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
function AppointmentConfigurationStack() {
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen
        name="AppointmentConfiguration"
        component={AppointmentConfiguration}
        
        options={{
          title: 'Configuração de Apontamento',
          headerStyle: {
            backgroundColor: theme.color.background,
          },
        
          headerTintColor: theme.color.heading,
          headerShown:true,
          header: (props) => <CustomHeader {...props} /> 
          
          
        }}
        
      />

      <stackNavigator.Screen
        name="CreateAppointmentConfiguration"
        component={CreateAppointmentConfiguration}
        
        options={{
          title: 'Configuração de Apontamento',
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

function ProfileStack() {
  const { signOut,user } = useAuth()
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen
        name="Profile"
        component={Profile}
        initialParams={{email:user?.email,id:user?.id,Avatar:user?.Avatar,permissionsID:user?.permissions.id,employeeId:user?.employeeId}}
        options={{
          title: 'Perfil',
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
  const { signOut,user } = useAuth()
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
    {/* <Screen
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
    /> */}
    {user?.permissions.id == '1' ? (
      <Screen
      name="UsersDrawer"
      component={UserStack}
      options={{
        title: 'Usuários',
        headerShown:false,
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
):null}
 {user?.permissions.id == '1' ? (
  <Screen
      name="DepartmentDraw"
      component={DepartamentStack}
      
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
    ):null}

{user?.permissions.id == '1' ? (
<Screen
      name="AppointmentConfigurationDrawer"
      component={AppointmentConfigurationStack}
      
      options={{
        title: 'Configuração de Apontamento',
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerShown:false,
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
    ):null}
    {user?.permissions.id == '3' || user?.permissions.id == '2' ? (
    <Screen
      name="ProfileDrawer"
      component={ProfileStack}
      
      options={{
        title: 'Perfil',
        
        headerStyle: {
          backgroundColor: theme.color.background,
        },
        headerShown:false,
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
    ):null}
    

    
  </Navigator>
  )
}