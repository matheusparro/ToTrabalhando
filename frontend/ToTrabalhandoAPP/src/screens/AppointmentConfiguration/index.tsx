import React, {  useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableWithoutFeedback, Pressable, TextInput } from 'react-native';
import { styles } from './styles'
import {useAuth} from '../../contexts/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import api from '../../services/api'

interface allAppointmentsConf{
  id:string
  name:string,
  endTime:string,
  endTimeEnd:string,
  startTime:string,
  startTimeEnd:string,
}
export function AppointmentConfiguration() {

const [allAppointmentsConf,setAllAppointmentsConf]= useState<allAppointmentsConf[]>([])
const [allAppointmentsConfMaster,setAllAppointmentsConfMaster]= useState<allAppointmentsConf[]>([])
const [search,setSearch]= useState<string>('')
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
    async function allAppointmentsConfFound(){
      if(isFocused){
        setSearch('')
        const result = await api.get(`/company/${user?.companyId}/appointment-configuration/all`)
        if (result.data) {
          setAllAppointmentsConf(result.data)
          setAllAppointmentsConfMaster(result.data)
        }
      }
    }
    allAppointmentsConfFound()
  },[isFocused])
  
  const searchText = (text:string) =>{
    if(text){
      const newData = allAppointmentsConfMaster.filter((item)=>{
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;


      })
      setAllAppointmentsConf(newData);
      setSearch(text)
    } else {
      setAllAppointmentsConf(allAppointmentsConfMaster)
      setSearch(text)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentList}>
        <View >
        <TextInput placeholder='Procure aqui' onChangeText={(text)=> searchText(text)} style={{backgroundColor:'#d390fa',borderWidth:1, paddingLeft:20, margin:5,padding:15,marginHorizontal:10,marginBottom:10}} >{search}</TextInput>
        <FlatList
        data={allAppointmentsConf}
        renderItem={({item}) =>
          <Pressable onPress={() => {
            navigation.navigate("CreateAppointmentConfiguration" as never, {id:item.id,name:item.name, endTime:item.endTime,
              endTimeEnd:item.endTimeEnd,
              startTime:item.startTime,
              startTimeEnd:item.startTimeEnd,} as never)
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
      navigation.navigate("CreateAppointmentConfiguration" as never, {} as never)
    }}
  />
    </View>
  );

}
