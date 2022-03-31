import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar,TextInput,TouchableOpacity,ScrollView, Alert } from 'react-native';
import { useForm } from 'react-hook-form'

import {styles} from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import {theme} from '../../global/styles/theme'
import axios from 'axios'

type FormData = {
  cnpj:string,
  fantasyName:string
}

export function CreateCompany() {
  const {control,handleSubmit} = useForm<FormData>()
  async function handleCompanyRegister(data:FormData){
    try {
      let teste = {cnpj:"123",fantasyName:"JOAO"}
      const a = await axios.post('http://10.0.2.2:3333/users/1/company',data)
    } catch (error) {
      console.log(JSON.stringify(error))
    }
   
    
  }
    
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cadastrar Empresa</Text>
        <ControlledInput name="cnpj" control={control}keyboardType="numeric" labelName="CNPJ da Empresa"/>
        <ControlledInput  name="fantasyName" control={control} labelName="Nome da Empresa"/>
        <View style={{marginTop:20}}>
          <ButtonIcon onPress={handleSubmit(handleCompanyRegister)} color={theme.color.primary}title='Cadastrar' activeOpacity={0.8}/>
        </View>
        <View style={{marginTop:20}}>
          <ButtonIcon  color={theme.color.cancel}title='Voltar' activeOpacity={0.8}/>
        </View>
      </View>
    </View>
  );
}