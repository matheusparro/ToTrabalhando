import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable, Platform } from 'react-native';
import { Controller, useForm } from 'react-hook-form'
import { styles } from './styles'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import { RouteProp, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { onChange } from 'react-native-reanimated';
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
      if(route.params &&!route.params.id){
        const result = await api.post(`/company/${user?.companyId}/appointment-configuration`, data)
        if (result.status==201) {
        
          Alert.alert("Configuração Apontamento", "Criada com sucesso")
          
         //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 2));
        }
      }else{
        const result = await api.patch(`/appointment-configuration/${route.params.id}`, data)
        
        if (result.status==201) {
        
         Alert.alert("Configuração Apontamento","Atualizada com sucesso")
          //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 1));
        }
      }
      console.log(startTimeEnd)
    } catch (error: any) {
      Alert.alert("Department: ", error.response.data.message);
    }
  }

  const setDateChange = (event:any, date:any) => {
    setIsPickerShow(false)
    setStartTime(date)

  };
  const setDateChange2 = (event:any, date:any) => {
    setIsPickerShow2(false)
    setStartTimeEnd(date)

  };
  const setDateChange3 = (event:any, date:any) => {
    setIsPickerShow3(false)
    setEndTime(date)

  };
  const setDateChange4= (event:any, date:any) => {
    setIsPickerShow4(false)
    setEndTimeEnd(date)

  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="name" control={control} labelName="Nome" />
          <Pressable onPress={()=>showPicker()}>
          <ControlledInput value={startTime &&(String(new Date(startTime).getHours() +":"+new Date(startTime).getMinutes()) +" "+ (new Date(startTime).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="1° Entrada " >
            </ControlledInput>
              {isPickerShow &&   
              <RNDateTimePicker  value={new Date()}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            dateFormat="day month year"
            onChange={setDateChange}
            style={styles2.datePicker} />
            }
          </Pressable>


          <Pressable onPress={()=>showPicker2()}>
            <ControlledInput value={startTimeEnd &&(String(new Date(startTimeEnd).getHours() +":"+new Date(startTimeEnd).getMinutes()) +" "+ (new Date(startTimeEnd).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="1° Saída" >
            </ControlledInput>
              {isPickerShow2 &&   
              <RNDateTimePicker  value={new Date()}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            dateFormat="day month year"
            onChange={setDateChange2}
            style={styles2.datePicker} />
            }
          </Pressable>

          <Pressable onPress={()=>showPicker3()}>
            <ControlledInput value={endTime &&(String(new Date(endTime).getHours() +":"+new Date(endTime).getMinutes()) +" "+ (new Date(endTime).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="2° Entrada" >
            </ControlledInput>
              {isPickerShow3 &&   
              <RNDateTimePicker  value={new Date()}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            dateFormat="day month year"
            onChange={setDateChange3}
            style={styles2.datePicker} />
            }
          </Pressable>

          <Pressable onPress={()=>showPicker4()}>
            <ControlledInput value={endTimeEnd &&(String(new Date(endTimeEnd).getHours() +":"+new Date(endTimeEnd).getMinutes()) +" "+ (new Date(endTimeEnd).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="2° Saída" >
            </ControlledInput>
              {isPickerShow4 &&   
              <RNDateTimePicker  value={new Date()}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            dateFormat="day month year"
            onChange={setDateChange4}
            style={styles2.datePicker} />
            }
          </Pressable>
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