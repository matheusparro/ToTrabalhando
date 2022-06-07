import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles'
import { ButtonIcon } from '../../components/ButtonIcon';
import { theme } from '../../global/styles/theme'
import {useAuth} from '../../contexts/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import api from '../../services/api'

interface allUsers{
  email:string
  id:string
  Avatar:string
  permissionsID:string
}
export function User() {

const [allUsers,setAllUsers]= useState<allUsers[] | null>(null)
  const styles2 = StyleSheet.create({
    fab: {
      position: 'absolute',
      marginRight: 16,
      right: 0,
      bottom: 30,
    },
  })
 const { signOut,user } = useAuth()
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  useEffect(() =>{
    async function allUsersFound(){
      if(isFocused){
        const result = await api.get(`http://10.0.2.2:3333/company/${user?.companyId}/users`)
        if (result.data) {
        
          setAllUsers(result.data)
          console.log(allUsers)
        }
      }
    }
    allUsersFound()
  },[isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View >
        {/* <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]} */}
        <FlatList
        data={allUsers}
        renderItem={({item}) =>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate("UserInsert" as never, {email:item.email,id:item.id,Avatar:item.Avatar,permissionsID:item.permissionsID} as never)
          }}>
            <Text style={styles.item}>{item?.email}</Text>
          </TouchableWithoutFeedback> 
        }
      />
        </View>
      
      </View>
      <FAB
    style={styles2.fab}
    small
    icon="plus"
    onPress={() => {
      navigation.navigate("UserInsert" as never, {} as never)
    }}
  />
    </View>
  );

}
