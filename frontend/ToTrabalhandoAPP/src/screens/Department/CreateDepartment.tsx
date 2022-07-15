import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Controller, useForm } from 'react-hook-form'
import { styles } from './styles'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import { RouteProp, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
type FormData = {
  name: string,
  companyId: string | undefined,
}


type ParamList = {
  Detail: {
    id: string
    name: string,
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
        
        if(route.params.id){
          reset({name:route.params.name})
        }else reset()
      
    }
  }
    focusSreen()
  }, [isFocused])

  async function handleUserRegister(data: FormData) {
    try {
      if(data.name =='' ||data.name ==null){
        Alert.alert("Departamento","Digite um nome  *Obrigatório")
        return
      }
      if(!route.params.id){
       
        const result = await api.post(`/company/${user?.companyId}/department`, data)
        if (result.status==201) {
          
        
         Alert.alert("Departamento","Criado com sucesso")
         //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 2));
        }
      }else{
        const result = await api.patch(`/department/${route.params.id}`, data)
        
        if (result.data) {
        
          Alert.alert("Departamento","Atualizado com sucesso")
          //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 1));
        }
      }
    } catch (error: any) {
      Alert.alert("Departmento: ", error.response.data.message);
    }

  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput  name="name" control={control} labelName="Nome" />
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleUserRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}