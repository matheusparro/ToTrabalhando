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

export function Home() {


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
 

  // const pickImage2 = async () => {
    
  

//    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//    if (permissionResult.granted === false) {
//      alert("You've refused to allow this appp to access your camera!");
//      return;
//    }
  

//     let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
//     console.log(image);
// }






  async function pickImage() {
    // No permissions request is necessary for launching the image library
    setTestmsg('forcing refresh')
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    //console.log(result);

    if (!result.cancelled) {
      setUserAvatar(result.uri);
      console.log(userAvatar);
    }

  };
  const pickFromCamera = async ()=>{
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if(permissionResult.granted){
       let data =  await ImagePicker.launchCameraAsync({
         mediaTypes:ImagePicker.MediaTypeOptions.Images,
         allowsEditing:true,
         aspect:[4,3],
         quality:1
       })
      if(!data.cancelled){
        setUserAvatar(data.uri)
        let newfile = { 
         uri:data.uri,
         type:`test/${data.uri.split(".")[1]}`,
         name:`test.${data.uri.split(".")[1]}` 
       
 
       }
      
       handleUserRegister(newfile.uri)
      }
    }else{
      Alert.alert("you need to give up permission to work")
    }
   }
   useEffect(() =>{
  
    console.log("MEU LOCAL EFFECT",userAvatar)
  },[userAvatar])
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  async function handleUserRegister(teste2:string) {
    try {
      let localUri = teste2;
     
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects

      const teste: any = { uri: String(teste2), type: 'image/jpg', name: "teste" }
      formData.append("faceToAnalize", teste);
      formData.append("employeeId", String(user?.employeeId));
      formData.append("appointmentTime", String(new Date(Date.now())));
      
      const result = await api.post('/appointment', formData, config)
     
      if (result.status == 201) {
        Alert.alert("Apontamento","Realizado com sucesso")
        await setLastAppointment()
      }
    } catch (error: any) {
      console.log(error.message)
      Alert.alert("Reconhecimento Facial","Erro tente novamente");
    }

  }

  async function setLastAppointment(){
    if(user?.employeeId){
    let result= await api.get(`/employee/${user?.employeeId}/appointment/last`)
    const data = result.data.appointmentTimeEnd?result.data.appointmentTimeEnd:result.data.appointmentTime
    
    let teste = moment(data);
    var offset = moment().utcOffset();

     const teste2 = teste.tz('America/Sao_Paulo')
     console.log(teste2)
    result.data &&  setLastApDate(teste2.format('LL'))
    result.data && setLastApHour(teste2.format('HH:mm:ss'))

   result = await api.get(`/employee/${user?.employeeId}/comp_time/year`)
   result.data && setHoursMonth(result.data)
    }
  }
  useEffect(() =>{
    
    async function allFields(){
      if(isFocused){
        await setLastAppointment()
      }
     
    }
    
    allFields()
  },[isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={{ color: theme.color.heading }}>Grafíco de Horas Trabalhadas por mês</Text>
        <View style={{ marginBottom: 20 }}>
          <LineChart
            data={{
              labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
              datasets: [
                {
                  data:hoursMonth
                }
              ]
            }}
            width={screenWidth - 20} // from react-native
            height={220}
            yAxisInterval={1}
            onDataPointClick={(data)=>Alert.alert("Valor selecionado",String(data.value + " horas"))}
            // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#5A17AC",
              backgroundGradientFrom: "#CA5AF0",
              backgroundGradientTo: "#69146D",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,

              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#FF26BE"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        <Text style={{ color: theme.color.heading, marginBottom: 20 }}>Último Apontamento realizado</Text>
        <View style={{ borderRadius: 16,alignItems:"center",height:80,marginBottom: 20,backgroundColor: '#6d30a3',flexDirection: 'column' }}>
         
         
          
          
          <View style={{flexDirection: 'row',marginVertical:5,} }>
              <Ionicons style={{color: theme.color.heading,textAlignVertical:'center',paddingLeft:10}} name="calendar-outline" size={28} />
              <Text style={{color: theme.color.heading,textAlignVertical:'center', fontSize:20}}>{lastApDate}</Text>
             
          </View>
            
            <View style={{flexDirection: 'row'} }>
              <Ionicons style={{color: theme.color.heading,textAlignVertical:'center',paddingLeft:10}} name="time-outline" size={28} />
              <Text style={{color: theme.color.heading,textAlignVertical:'center', fontSize:20}}>{lastApHour}</Text>
             
            </View>
          
        </View>
        <View >
          <ButtonIcon onPress={pickFromCamera} color={theme.color.primary} title='Bater Ponto' activeOpacity={0.8} />
         
        </View>
        
      </View>
    </View>
  );

}
