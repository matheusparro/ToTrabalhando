import React, {  useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles'
import {useAuth} from '../../contexts/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import api from '../../services/api'

interface allAppointmentsConf{
  id:string
  name:string
}
export function AppointmentConfiguration() {

const [allAppointmentsConf,setAllAppointmentsConf]= useState<allAppointmentsConf[] | null>(null)
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
        const result = await api.get(`/company/${user?.companyId}/appointment-configuration/all`)
        if (result.data) {
          setAllAppointmentsConf(result.data)
        }
      }
    }
    allAppointmentsConfFound()
  },[isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View >
        <FlatList
        data={allAppointmentsConf}
        renderItem={({item}) =>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate("DepartmentInsert" as never, {id:item.id,name:item.name} as never)
          }}>
            <Text style={styles.item}>{item?.name}</Text>
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
      navigation.navigate("DepartmentInsert" as never, {} as never)
    }}
  />
    </View>
  );

}
