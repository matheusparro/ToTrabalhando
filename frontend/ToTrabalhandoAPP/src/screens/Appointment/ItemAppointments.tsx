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


interface Appointment {
  
    id: string
    appointmentTime: string,
    appointmentTimeEnd: string,
    appointmentDate:string,
    status: string,
    employeeId: string,
}
interface allDepartments{
  data:string,
  situacao:number
  appointments:Appointment[]
}
type ParamList = {
  Detail: {
    employeeId:string,
    data:string,
    situacao:number
    appointments:[]
  };
};

export function ItemAppointment() {

const [allAppointments,setAllAppointments]= useState<allDepartments | null>(null)
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
       if(route.params){
        setAllAppointments(route.params)
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
        <Text style={{marginTop:20,
                fontSize: 20,
                fontWeight:"bold",
                color: route.params.situacao ==1?"#0e5525":route.params.situacao ==2 ?"#ae2222":"#D3D934",paddingLeft:20,
                
              }}>{moment(allAppointments?.data).tz('America/Sao_Paulo').format('LL')}</Text>
        <FlatList
        data={allAppointments?.appointments}
        renderItem={({item}) =>
        
          <Pressable key={item.id} onPress={() => {
            navigation.navigate("ItemAppointmentUpdated" as never, {id:item.id,appointmentTime:item.appointmentTime?item.appointmentTime:'',
              appointmentTimeEnd:item.appointmentTimeEnd?item.appointmentTimeEnd:'',employeeId:item.employeeId} as never)
          }}>
              <View  style={styles.item2}>
              <Text style={{textAlignVertical:"center",
                fontSize: 20,
                fontWeight:"bold",
                color: route.params.situacao ==1?"#0e5525":route.params.situacao ==2 ?"#ae2222":"#D3D934",paddingLeft:20,
                
              }}>{moment(item.appointmentTime).tz('America/Sao_Paulo').format('HH:mm:ss')} Até {moment(item.appointmentTimeEnd).tz('America/Sao_Paulo').format('HH:mm:ss')}</Text>
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
