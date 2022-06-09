import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Controller, useForm } from 'react-hook-form'
import { styles } from './styles'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import { RouteProp, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
type FormData = {

  email: string,
  password: string
  userAvatar: {
    uri: string | null,
    type: string,
    name: string
  },
  companyId: string | undefined,
  permissionsID: string
}


type ParamList = {
  Detail: {
    id: string
    email: string,
    password: string,
    Avatar: string,
    permissionsID: string
    employeeId:string
  };
};


export function CreateDepartment() {
  const { control, handleSubmit, reset, register } = useForm<FormData>()
  const isFocused = useIsFocused();
  const { user } = useAuth()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  

  useEffect(() => {
    async function focusSreen() {
    
      if (isFocused) {
        reset()
      
    }
  }
    focusSreen()
  }, [isFocused])

  async function handleUserRegister(data: FormData) {
    try {
    
    } catch (error: any) {
      Alert.alert("Department: ", error.response.data.message);
    }

  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="name" control={control} labelName="Nome" />
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleUserRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}