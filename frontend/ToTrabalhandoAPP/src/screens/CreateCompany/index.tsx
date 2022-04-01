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
      const userToCreate = {
        email: data.email,
        password: data.password,
        name: data.fantasyName,
        isAdmin: true
      }
      const companyToCreate = {
        cnpj: data.cnpj,
        fantasyName: data.fantasyName
      }
      console.log(userToCreate)
      let result = await axios.post('http://10.0.2.2:3333/users/', userToCreate)
      console.log(result.status)
      if (result.status == 201) {
        result = await axios.post('http://10.0.2.2:3333/company/', companyToCreate)
      }
      if (result.data) {
       
        alert("Empresa criada com sucesso")
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