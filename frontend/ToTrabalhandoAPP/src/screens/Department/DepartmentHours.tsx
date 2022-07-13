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

export function DepartmentHours() {


 const { signOut,user } = useAuth()
  const navigation = useNavigation()
  const [userAvatar, setUserAvatar] = useState<any>(null);
  const screenWidth = Dimensions.get("window").width;
  const isFocused = useIsFocused();
  const [hoursMonth,setHoursMonth]= useState<number[]>([0,0,0,0,0,0,0,0])
  const [lastApDate,setLastApDate] = useState('')
  const [lastApHour,setLastApHour] = useState('')
  const [cameraRollStatus,setCameraRollStatus] = useState('')
  const [cameraStatus,setCameraStatus] = useState('')
  const [testmsg,setTestmsg] = useState('')
  const [labels,setLabels] = useState<string[]>([''])
  const [labelsValues,setLabelsValues] = useState<number[][]>([])


  useEffect(() =>{
    
    async function allFields(){
      if(isFocused){
      const object = await api.get(`/company/${user?.companyId}/department/all/month`)
      setLabels( object.data.map((item: { name: string; }) =>{
        return item.name
       }) )
       setLabelsValues( object.data.map((item: { hours: string; }) =>{
        return [item.hours]
       }) )
       
      }
      
    
     console.log(labelsValues)
    }
    
    allFields()
  },[isFocused])

  return (
    <View style={styles.container}>
      <View style={{marginTop:30,}}>
  
        <Text style={{textAlign:'center', alignSelf:'center',fontSize:30,color: theme.color.heading }}>Grafíco de Horas {`\n`}Trabalhadas de cada {`\n`}Departamento no mês</Text>
        <View style={{ marginBottom: 20 }}>
  


{labelsValues.length>1 &&<StackedBarChart
hideLegend
  data={{
    labels:labels,
    legend: labels,
    data: labelsValues,
    barColors: ['#7B0C76', '#7B0C76', '#7B0C76'],

  }}
  width={Dimensions.get('window').width - 16}
  height={220}
  chartConfig={{
    backgroundColor: "#5A17AC",
    backgroundGradientFrom: "#CA5AF0",
    backgroundGradientTo: "#69146D",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
    
  }}
/> }

        </View>

        
      </View>
    </View>
  );

}
