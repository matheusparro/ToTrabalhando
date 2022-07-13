import React, {  useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableWithoutFeedback, Pressable, TextInput } from 'react-native';
import { styles } from './styles'
import {useAuth} from '../../contexts/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import api from '../../services/api'

interface allDepartments{
  id:string
  name:string
}
export function Department() {

const [allDepartments,setAllDepartments]= useState<allDepartments[]>([])
const [search,setSearch]= useState<string>('')
const [allDepartmentsMaster,setAllDepartmentsMaster]= useState<allDepartments[]>([])
  const styles2 = StyleSheet.create({
    fab: {
      position: 'absolute',
      marginRight: 16,
      right: 0,
      bottom: 30,
    },
  })
 const { user } = useAuth()
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  useEffect(() =>{
    async function allDepartmentsFound(){
      if(isFocused){
        const result = await api.get(`/company/${user?.companyId}/department/all`)
        if (result.data) {
          setAllDepartments(result.data)
          setAllDepartmentsMaster(result.data)
        }
      }
    }
    allDepartmentsFound()
  },[isFocused])
  const searchText = (text:string) =>{
    if(text){
      const newData = allDepartmentsMaster.filter((item)=>{
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;


      })
      setAllDepartments(newData);
      setSearch(text)
    } else {
      setAllDepartments(allDepartmentsMaster)
      setSearch(text)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentList}>
        <View >
        <TextInput placeholder='Procure aqui' onChangeText={(text)=> searchText(text)} style={{backgroundColor:'#d390fa',borderWidth:1, paddingLeft:20, margin:5,padding:15,marginHorizontal:10,marginBottom:10}} >{search}</TextInput>
        <FlatList
        data={allDepartments}
        renderItem={({item}) =>
          <Pressable onPress={() => {
            navigation.navigate("DepartmentInsert" as never, {id:item.id,name:item.name} as never)
          }}>
            <Text style={styles.item}>{item?.name}</Text>
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
      navigation.navigate("DepartmentInsert" as never, {} as never)
    }}
  />
    </View>
  );

}
