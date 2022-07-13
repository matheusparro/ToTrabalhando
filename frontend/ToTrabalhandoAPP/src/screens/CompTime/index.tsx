import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { theme } from '../../global/styles/theme'
import {useAuth} from '../../contexts/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'moment/locale/pt-br'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import api from '../../services/api';
import moment from 'moment-timezone';
interface CompTime {
  
    id: string,
   hoursWorked: string,
   extraHoursWorked: string,
   missingHoursWorked: string,
   total:string,

}

export function CompTime() {


 const { signOut,user } = useAuth()
  const navigation = useNavigation()
  const [userAvatar, setUserAvatar] = useState<any>(null);
  const screenWidth = Dimensions.get("window").width;
  const isFocused = useIsFocused();
  const [hoursMonth,setHoursMonth]= useState<number[]>([0,0,0,0,0,0,0,0])
  const [lastApDate,setLastApDate] = useState('')
  const [lastApHour,setLastApHour] = useState('')
  const [compTime, setCompTime] = useState<CompTime>()
 
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  function convertHoursToHoursMinutes(hoursSend:number):string{
    var hours = hoursSend
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
  }

  useEffect(() =>{
    
    async function allFields(){
      if(isFocused){
        const result = await api.get(`/employee/${user?.employeeId}/comp_time/`)


        if( result.data){
         
          const total = result.data.extraHoursWorked + result.data.hoursWorked
          const comp:CompTime = result.data
          var hours = result.data.extraHoursWorked
          var rhours = Math.floor(hours);
          var minutes = (hours - rhours) * 60;
          var rminutes = Math.round(minutes);
          comp.extraHoursWorked = convertHoursToHoursMinutes(Number(result.data.extraHoursWorked))
          comp.hoursWorked =convertHoursToHoursMinutes(Number(result.data.hoursWorked))
          comp.missingHoursWorked =convertHoursToHoursMinutes(Number(result.data.missingHoursWorked))
          
          comp.total =  convertHoursToHoursMinutes(total)
          setCompTime(comp)
        }
      }
     
    }
    
    allFields()
  },[isFocused])
  

  
  const data = {
    labels: ["Horas Normais"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };
  return (
    
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={{ color: theme.color.heading }}>Horas Normais</Text>
        
        <View style={{ width:200,justifyContent:'center',borderRadius: 16,alignItems:"center",height:80,marginBottom: 20,backgroundColor: '#187545',flexDirection: 'column' }}>
         
         
          
          
          <View style={{flexDirection: 'row',marginVertical:5,} }>
              <Ionicons style={{color: theme.color.heading,textAlignVertical:'center',paddingLeft:10}} name="calendar-outline" size={28} />
              <Text style={{color: theme.color.heading,textAlignVertical:'center', fontSize:20}}>{compTime?.hoursWorked}</Text>
             
          </View>
            
        </View>


        <Text style={{ color: theme.color.heading }}>Horas Extras</Text>
        
        <View style={{ width:200,justifyContent:'center', borderRadius: 16,alignItems:"center",height:80,marginBottom: 20,backgroundColor: '#164a6f',flexDirection: 'column' }}>
         
         
          
          
          <View style={{flexDirection: 'row',marginVertical:5,justifyContent:'center'} }>
              <Ionicons style={{color: theme.color.heading,textAlignVertical:'center',paddingLeft:10}} name="calendar-outline" size={28} />
              <Text style={{justifyContent:'center',color: theme.color.heading,textAlignVertical:'center', fontSize:20}}>{compTime?.extraHoursWorked}</Text>
             
          </View>
            
        </View>


         <Text style={{ color: theme.color.heading }}>Horas Faltantes</Text>
        
        <View style={{width:200,justifyContent:'center', borderRadius: 16,alignItems:"center",height:80,marginBottom: 20,backgroundColor: '#672c16',flexDirection: 'column' }}>
         
         
          
          
          <View style={{flexDirection: 'row',marginVertical:5,} }>
              <Ionicons style={{color: theme.color.heading,textAlignVertical:'center',paddingLeft:10}} name="calendar-outline" size={28} />
              <Text style={{color: theme.color.heading,textAlignVertical:'center', fontSize:20}}>{compTime?.missingHoursWorked}</Text>
             
          </View>
            
        </View>

        <Text style={{ color: theme.color.heading }}>Horas Totais Trabalhadas</Text>
        
        <View style={{ width:200,justifyContent:'center', borderRadius: 16,alignItems:"center",height:80,marginBottom: 20,backgroundColor: '#164a6f',flexDirection: 'column' }}>
         
         
          
          
          <View style={{flexDirection: 'row',marginVertical:5,justifyContent:'center'} }>
              <Ionicons style={{color: theme.color.heading,textAlignVertical:'center',paddingLeft:10}} name="calendar-outline" size={28} />
              <Text style={{justifyContent:'center',color: theme.color.heading,textAlignVertical:'center', fontSize:20}}>{compTime?.total}</Text>
             
          </View>
            
        </View>
        
        
      </View>
    </View>
  );

}
