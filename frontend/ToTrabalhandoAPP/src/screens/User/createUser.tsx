import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput,StyleSheet, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useForm } from 'react-hook-form'
import { Picker } from "@react-native-picker/picker";
import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import axios from 'axios'
import { useIsFocused, useNavigation, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
type FormData = {

  name: string,
  cpf: string
  pis: string,
  departmentId: number,
  appointmentConfigurationId: number,
  userId:string,

}
interface allDepartment{
  name:string,
  id:string
}

export function CreateUser() {
  const { control, handleSubmit } = useForm<FormData>()
  const navigation = useNavigation()
  const [department, setDepartment] = useState("")
  const { user } = useAuth()
  const [allDepartments, setAllDepartments] = useState<[allDepartment] | null>(null)
  const isFocused = useIsFocused();
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        backgroundColor:"#3333",// to ensure the text is never behind the icon
    }
});
  async function handleEmployeeRegister(data: FormData) {
    
    try {
   
      const result = await axios.post('http://10.0.2.2:3333/employee/', data)
      
      if (result.data) {
       
        
      }
    } catch (error:any) {
      alert(error.response.data.message);
      
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="email" control={control} keyboardType="numeric" labelName="E-mail" />
        <ControlledInput name="password" control={control} labelName="Senha" />
        <Pressable onPress={() => alert('Hi!')}>
         
      
          <ControlledInput editable={false} name="employee" control={control} keyboardType="numeric" labelName="Funcionário" />
          </Pressable>
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleEmployeeRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}