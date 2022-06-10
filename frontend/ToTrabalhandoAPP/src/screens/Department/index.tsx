import React, {  useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableWithoutFeedback, Pressable } from 'react-native';
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

const [allDepartments,setAllDepartments]= useState<allDepartments[] | null>(null)
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
        }
      }
    }
    allDepartmentsFound()
  },[isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.contentList}>
        <View >
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
