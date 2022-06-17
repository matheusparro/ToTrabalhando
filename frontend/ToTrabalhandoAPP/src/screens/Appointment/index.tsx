import React, {  useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableWithoutFeedback, Pressable } from 'react-native';
import { styles } from './styles'
import {useAuth} from '../../contexts/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import api from '../../services/api'
import moment from 'moment';
import { theme } from '../../global/styles/theme';

interface allDepartments{
  data:string,
  situacao:number
}
export function Appointment() {

const [allAppointments,setAllAppointments]= useState<allDepartments[] | null>(null)
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
        const result = await api.get(`employee/${user?.employeeId}/appointment`)
        if (result.data) {
        
          setAllAppointments(result.data)
          console.log("AQUIIIIIIIIIIIIIIIIIIIIIIAQUIIIIIIIIIIIIIIIIIIIIII")
          console.log(allAppointments)
        }
      }
    }
    allDepartmentsFound()
  },[isFocused])
  async function returnFormatedDate(data:string){
      
    let teste = moment(data);
    var offset = moment().utcOffset();

     const teste2 = teste.tz('America/Sao_Paulo')
     return String(teste2.format('YYYY-MM-DD'))
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentList}>
        <View >
        <FlatList
        data={allAppointments}
        renderItem={({item}) =>
        
          <Pressable onPress={() => {
            //navigation.navigate("DepartmentInsert" as never, {id:item.name,name:item.name} as never)
          }}>
              <View key={item.data} style={styles.item}>
              
                <Text style={{marginTop:20,
                fontSize: 20,
                fontWeight:"bold",
                color: item.situacao ==1?"#0e5525":item.situacao ==2 ?"#ae2222":"#afb42c",paddingLeft:20,
                
              }}>{moment(item.data).tz('America/Sao_Paulo').format('LL')}</Text>
                <Text key={item.data} style={{color: item.situacao ==1?"#258543":item.situacao ==2 ?"#ae2222":"#afb42c",paddingLeft:20, fontWeight:"bold"}}>{item.situacao ==1 ? "Concluído": item.situacao == 2 ? "Falta":"Incompleto"}</Text>
              </View>
             
            
           
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
