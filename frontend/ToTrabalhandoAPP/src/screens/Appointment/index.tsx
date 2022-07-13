import React, {  useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableWithoutFeedback, Pressable } from 'react-native';
import { styles } from './styles'
import {useAuth} from '../../contexts/auth';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import api from '../../services/api'
import moment from 'moment';
import { theme } from '../../global/styles/theme';

interface allDepartments{
  data:string,
  situacao:number
  appointments:[]
}
type ParamList = {
  Detail: {
    employeeId:string,
  };
};

export function Appointment() {

const [allAppointments,setAllAppointments]= useState<allDepartments[] | null>(null)
const route = useRoute<RouteProp<ParamList, 'Detail'>>();
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

        let idToFind =''
        if(route.params && route.params.employeeId){
          idToFind = route.params.employeeId
        }else{
          idToFind = String(user?.employeeId)
        }
        const result = await api.get(`employee/${idToFind}/appointment`)
      
        if (result.data) {
          setAllAppointments(result.data)
        
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
        
          <Pressable key={item.data} onPress={() => {
            
            (route.params && route.params.employeeId) && navigation.navigate("ItemAppointment" as never, {data:item.data,appointments:item.appointments,situacao:item.situacao} as never)
          }}>
              <View  style={styles.item}>
              
                <Text style={{marginTop:20,
                fontSize: 20,
                fontWeight:"bold",
                color: item.situacao ==1?"#0e5525":item.situacao ==2 ?"#ae2222":"#afb42c",paddingLeft:20,
                
              }}>{moment(item.data).tz('America/Sao_Paulo').format('LL')}</Text>
                <Text style={{color: item.situacao ==1?"#258543":item.situacao ==2 ?"#ae2222":"#afb42c",paddingLeft:20, fontWeight:"bold"}}>{item.situacao ==1 ? "Concluído": item.situacao == 2 ? "Falta":"Incompleto"}</Text>
              </View>
             
            
           
          </Pressable> 
        }
      />
      
        </View>
      
      </View>
    </View>
  );

}
