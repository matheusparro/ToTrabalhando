import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm } from 'react-hook-form'

import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

type FormData = {

  name: string,
  cpf: string
  pis: string,
  departmentId: number,
  appointmentConfigurationId: number,
  userId:string,

}
interface a{
  string:string
}

export function CreateEmployee() {
  const { control, handleSubmit } = useForm<FormData>()
  const navigation = useNavigation()

  async function handleEmployeeRegister(data: FormData) {
    try {
   
      const result = await axios.post('http://10.0.2.2:3333/employee/', data)
      
      if (result.data) {
       
        alert("Funcionário criado com sucesso")
        //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 1));
      }
    } catch (error:any) {
      alert(error.response.data.message);
      
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="name" control={control} keyboardType="numeric" labelName="Nome" />
        <ControlledInput name="cpf" control={control} labelName="Cpf" />
        <ControlledInput name="pis" control={control} labelName="Pis" />
        <ControlledInput name="departmentId" control={control} labelName="Departamento" />
        <ControlledInput name="appointmentConfigurationId" control={control} labelName="Configuração de Apontamento" />
        <ControlledInput name="userId" control={control} labelName="Usuário" />
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleEmployeeRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}