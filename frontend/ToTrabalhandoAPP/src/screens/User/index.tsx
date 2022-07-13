import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, FlatList, TouchableWithoutFeedback, Pressable } from 'react-native';
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
  employeeId:string
}
export function User() {

const [allUsers,setAllUsers]= useState<allUsers[]>([])
const [allUsersMaster,setAllUsersMaster]= useState<allUsers[]>([])
const [search,setSearch]= useState<string>('')
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
        
        if(user?.employee?.departmentId){


        }
        const result = await api.get(`/company/${user?.companyId}/users`,{
          params:{
            departmentId: user && user?.employee && user?.employee?.departmentId
          }
        })
      
        if (result.data) {
        
          setAllUsers(result.data)
          setAllUsersMaster(result.data)
        }
      }
    }
    allUsersFound()
  },[isFocused])
  const searchText = (text:string) =>{
    if(text){
      const newData = allUsersMaster.filter((item)=>{
        const itemData = item.email ? item.email.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;


      })
      setAllUsers(newData);
      setSearch(text)
    } else {
      setAllUsers(allUsersMaster)
      setSearch(text)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentList}>
        <View >
          <TextInput placeholder='Procure aqui' onChangeText={(text)=> searchText(text)} style={{backgroundColor:'#d390fa',borderWidth:1, paddingLeft:20, margin:5,padding:15,marginHorizontal:10,marginBottom:10}} >{search}</TextInput>
        <FlatList
        data={allUsers}
        renderItem={({item}) =>
          <Pressable onPress={() => {
            navigation.navigate("UserInsert" as never, {email:item.email,id:item.id,Avatar:item.Avatar,permissionsID:item.permissionsID,employeeId:item.employeeId} as never)
          }}>
            <Text style={styles.item}>{item?.email}</Text>
          </Pressable> 
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
