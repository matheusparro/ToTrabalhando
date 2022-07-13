import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert,Pressable, Platform } from 'react-native';
import { Controller, useForm } from 'react-hook-form'
import { styles } from './styles'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import { RouteProp, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import axios from 'axios';
import api from '../../services/api';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { onChange } from 'react-native-reanimated';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
type FormData = {
  name: string,
  companyId: string | undefined,
  endTime:string,
  endTimeEnd:string,
  startTime:string,
  startTimeEnd:string,
}


type ParamList = {
  Detail: {
    id: string
    name: string,
    endTime:string,
    endTimeEnd:string,
    startTime:string,
    startTimeEnd:string,
  };
};


export function CreateAppointmentConfiguration() {
  const { control, handleSubmit, reset, register } = useForm<FormData>()
  const isFocused = useIsFocused();
  const { user } = useAuth()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [isPickerShow3, setIsPickerShow3] = useState(false);
  const [isPickerShow4, setIsPickerShow4] = useState(false);

  const [startTime, setStartTime] = useState<string>('');
  const [startTimeEnd, setStartTimeEnd] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [endTimeEnd, setEndTimeEnd] = useState<string>('');

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const showPicker2 = () => {
    setIsPickerShow2(true);
  };
  
  const showPicker3 = () => {
    setIsPickerShow3(true);
  };
  
  const showPicker4 = () => {
    setIsPickerShow4(true);
  };
  
  
  
  useEffect(() => {
    async function focusSreen() {
    
      if (isFocused) {
        
        if(route.params.id){
          reset({name: route.params.name})
          setStartTime(String(route.params.startTime))
          setStartTimeEnd(String(route.params.startTimeEnd))
          setEndTime(String(route.params.endTime))
          setEndTimeEnd(String(route.params.endTimeEnd))
        }else{
          reset({name: ''})
          setStartTime('')
          setStartTimeEnd('')
          setEndTime('')
          setEndTimeEnd('')
          
        }
      
    }
  }
    focusSreen()
  }, [isFocused])

  async function handleUserRegister(data: FormData) {
    try {
      data.companyId = user?.companyId
      data.startTime = startTime
      data.startTimeEnd = startTimeEnd
      data.endTime = endTime
      data.endTimeEnd = endTimeEnd
      if(moment(startTime).utc() > moment(endTime).utc() ) {

        Alert.alert("Configuração Apontamento", `1°${moment(startTime)} Entrada deve ser menor que 2°Entrada${moment(endTime)}`)
        return
      }
      
      if(route.params &&!route.params.id){
        const result = await api.post(`/company/${user?.companyId}/appointment-configuration`, data)
        if (result.status==201) {
        
          Alert.alert("Configuração Apontamento", "Criada com sucesso")
          
         //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 2));
        }
      }else{
        const result = await api.patch(`/appointment-configuration/${route.params.id}`, data)
        
        if (result.status==201) {
        
         Alert.alert("Apontamento","Criado com sucesso")
          //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 1));
        }
      }
      console.log(startTimeEnd)
    } catch (error: any) {
      Alert.alert("Department: ", error.response.data.message);
    }
  }

  const setDateChange = (date:Date | undefined) => {
    setIsPickerShow(false)
    setStartTime(String(date))

  };
  const setDateChange2= (date:Date | undefined) => {
    setIsPickerShow2(false)
    setStartTimeEnd(String(date))

  };
  const setDateChange3= (date:Date | undefined) => {
    setIsPickerShow3(false)
    setEndTime(String(date))

  };
  const setDateChange4= (date:Date | undefined) => {
    setIsPickerShow4(false)
    setEndTimeEnd(String(date))

  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="name" control={control} labelName="Nome" />
        <Pressable onPress={()=>showPicker2()}>
          <ControlledInput onPressIn={()=>showPicker()} value={startTime &&(String(new Date(startTime).getHours() +":"+new Date(startTime).getMinutes()) +" "+ (new Date(startTime).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="1° Entrada " >
            </ControlledInput>
              {(isPickerShow && Platform.OS === 'ios') &&   
              <DateTimePicker
              mode="time"
              isVisible={isPickerShow}
              onConfirm={setDateChange}
              datePickerContainerStyleIOS={{
                backgroundColor:'purple'
              }}
              onCancel={()=>{setIsPickerShow(false)}}
            />}
      </Pressable>

            <ControlledInput onPressIn={()=>showPicker2()} value={startTimeEnd &&(String(new Date(startTimeEnd).getHours() +":"+new Date(startTimeEnd).getMinutes()) +" "+ (new Date(startTimeEnd).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="1° Saída" >
            </ControlledInput>
            {isPickerShow2 &&   
              <DateTimePicker
              mode="time"
              isVisible={isPickerShow2}
              onConfirm={setDateChange2}
              datePickerContainerStyleIOS={{
                backgroundColor:'purple'
              }}
              onCancel={()=>{setIsPickerShow2(false)}}
            />}

            <ControlledInput onPressIn={()=>showPicker3()} value={endTime &&(String(new Date(endTime).getHours() +":"+new Date(endTime).getMinutes()) +" "+ (new Date(endTime).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="2° Entrada" >
            </ControlledInput>
            {isPickerShow3 &&   
              <DateTimePicker
              mode="time"
              isVisible={isPickerShow3}
              onConfirm={setDateChange3}
              datePickerContainerStyleIOS={{
                backgroundColor:'purple'
              }}
              onCancel={()=>{setIsPickerShow3(false)}}
            />}

            <ControlledInput   onPressIn={()=>showPicker4()}  value={endTimeEnd &&(String(new Date(endTimeEnd).getHours() +":"+new Date(endTimeEnd).getMinutes()) +" "+ (new Date(endTimeEnd).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="2° Saída" >
            </ControlledInput>
            {isPickerShow4 &&   
              <DateTimePicker
              mode="time"
              isVisible={isPickerShow4}
              onConfirm={setDateChange4}
              datePickerContainerStyleIOS={{
                backgroundColor:'purple'
              }}
              onCancel={()=>{setIsPickerShow4(false)}}
            />}
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleUserRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});