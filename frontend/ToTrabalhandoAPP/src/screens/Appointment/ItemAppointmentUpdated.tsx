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
type FormData = {
  id: string
  appointmentTimeEnd:string,
  appointmentTime:string,
}


type ParamList = {
  Detail: {
    id: string
    appointmentTimeEnd:string,
    appointmentTime:string,
  };
};


export function ItemAppointmentUpdated() {
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
  const showPicker = () => {
    setIsPickerShow(true);
  };
  const showPicker2 = () => {
    setIsPickerShow2(true);
  };
  
  
  useEffect(() => {
    async function focusSreen() {
      console.log("adas")
      setTimeout(() =>  navigation.navigate("MyAppointmentsDrawer" as never, {} as never), 1)
      if (isFocused) {
        console.log(route.params)
        if(route.params.id){
         
          setStartTime(String(route.params.appointmentTimeEnd))
          setStartTimeEnd(String(route.params.appointmentTimeEnd))
        }else{
          setStartTime('')
          setStartTimeEnd('')
          
        }
      
    }
  }
    focusSreen()
  }, [isFocused])

  async function handleUpdateAppoitnment(data: FormData) {
    try {
     console.log("CHAMOUUU")
      const objectData = {
				appointmentTime: startTime,
				appointmentTimeEnd: startTimeEnd,
      }
      console.log(objectData)
     
        const result = await api.put(`/appointment/${route.params.id}`, objectData)
        if (result.status==201) {
        
          Alert.alert("Apontamento", "Atualizado")
        
         
          
        }
      
    } catch (error: any) {
      Alert.alert("Apontamento: ", error.response.data.message);
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
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={()=>showPicker2()}>
          <ControlledInput onPressIn={()=>showPicker()} value={startTime &&(String(new Date(startTime).getHours() +":"+new Date(startTime).getMinutes()) +" "+ (new Date(startTime).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="Entrada " >
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

            <ControlledInput onPressIn={()=>showPicker2()} value={startTimeEnd &&(String(new Date(startTimeEnd).getHours() +":"+new Date(startTimeEnd).getMinutes()) +" "+ (new Date(startTimeEnd).getHours()>12 ? 'Pm':'Am'))} editable={false} name="startTimeEnd" control={control} labelName="Saída" >
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
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleUpdateAppoitnment)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
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