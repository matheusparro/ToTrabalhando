import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {AuthRoutes} from '../routes/AuthRoutes'
import {AppRoutes} from '../routes/AppRoutes'
import { View, ActivityIndicator } from 'react-native'
import { useAuth } from "../contexts/auth";

export function Routes(){
  const { signed , loading} = useAuth()
  if(loading){
    return (
      <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#666"/>
      </View>
    )
  }
  return(
    <NavigationContainer>
      
      {signed ? <AppRoutes /> :  <AuthRoutes/> }
     
    </NavigationContainer>
  )
}