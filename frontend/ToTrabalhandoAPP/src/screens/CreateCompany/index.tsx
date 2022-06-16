import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm } from 'react-hook-form'

import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

type FormData = {

  cnpj: string,
  fantasyName: string
  email: string,
  password: string,


}
interface a{
  string:string
}

export function CreateCompany() {
  const { control, handleSubmit } = useForm<FormData>()
  const navigation = useNavigation()
  async function handleCompanyRegister(data: FormData) {
    try {

      const companyToCreate = {
        cnpj: data.cnpj,
        fantasyName: data.fantasyName,
        email: data.email,
        password: data.password,
      }
      const result = await api.post('/company/', companyToCreate)
      
      if (result.data) {
       
        Alert.alert("Empresa","Criada com sucesso")
        new Promise((res) => setTimeout(()=>navigation.navigate("SignIn" as never, {} as never), 1));
      }
    } catch (error:any) {
      alert(error.response.data.message);
      
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="cnpj" control={control} keyboardType="numeric" labelName="CNPJ da Empresa" />
        <ControlledInput name="fantasyName" control={control} labelName="Nome da Empresa" />
        <ControlledInput name="email" control={control} labelName="Email" />
        <ControlledInput name="password" control={control} labelName="Senha" />
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleCompanyRegister)} color={theme.color.primary} title='Cadastrar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}