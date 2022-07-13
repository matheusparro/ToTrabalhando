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

  email: string,

}

export function ForgotPassword() {
  const { control, handleSubmit } = useForm<FormData>()
  const navigation = useNavigation()
  async function handleCompanyRegister(data: FormData) {
    try {
      if(!data.email){
        Alert.alert("Esqueci a senha","Digite um e-mail!")
        return
      }
      const companyToCreate = {
      
        email: data.email,
      
      }
      const result = await api.post('/forgot-password/', companyToCreate)
      if (result.status === 201) {
       
        Alert.alert("Esqueci a senha","Verifque seu e-mail para ter acesso a nova senha!")
        new Promise((res) => setTimeout(()=>navigation.navigate("SignIn" as never, {} as never), 0.2));
      }
    } catch (error:any) {
      Alert.alert("Esqueci a senha",error.response.data.message);
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="email" control={control} keyboardType="email-address" labelName="Digite seu e-mail" />
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleCompanyRegister)} color={theme.color.primary} title='Recuperar senha' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}