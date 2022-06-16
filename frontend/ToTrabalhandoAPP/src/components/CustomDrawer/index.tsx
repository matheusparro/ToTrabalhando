import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import {theme} from '../../global/styles/theme'

export function CustomDrawer(props:DrawerContentComponentProps){
  const { user,signOut} = useAuth()
  
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: theme.color.background}}>
        <View
          style={{padding: 20}}>
          <Image
          source={user?.Avatar? { uri: api.defaults.baseURL + "/" + user?.Avatar.split("\\")[1] }:require('../../assets/discord.png')}
           
            style={{height: 100, width: 100, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {user?.employee?.name ? user?.employee?.name: user?.email}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              {user?.company.fantasyName}
            </Text>
           
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text onPress={()=>{Alert.alert("ToTrabalhando","App desenvolvido para a apresentação da conclusão final do curso de Eng de Software - UDESC")}}
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
                MaP Software
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sair
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;