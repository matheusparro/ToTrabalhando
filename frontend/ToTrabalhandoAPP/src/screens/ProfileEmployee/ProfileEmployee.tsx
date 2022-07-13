import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable, ActivityIndicator } from 'react-native';
import { Controller, useForm } from 'react-hook-form'
import { styles } from './styles'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import { RouteProp, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import { Picker } from "@react-native-picker/picker";
type FormData = {

  email: string,
  oldPassword: string
  newPassword: string
  userAvatar: {
    uri: string | null,
    type: string,
    name: string
  },
  companyId: string | undefined,
  permissionsID: string
  employee:string
}


type ParamList = {
  Detail: {
    id: string
    email: string,
    password: string,
    Avatar: string,
    permissionsID: string
    employeeName:string
  };
};

type employee ={
  id:string,
  name:string,
  cpf:string,
  pis:string,
  departmentId:string,
  appointmentConfigurationId:string
}



export function ProfileEmployee() {
  const { control, handleSubmit, reset, register } = useForm<FormData>()
  const isFocused = useIsFocused();
  const { user } = useAuth()
  const [userAvatar, setUserAvatar] = useState<any>(null);
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const [employee, setEmployee] = useState<employee | null>(null)
  const [isLoading,setIsLoading] = useState(false)
  const perm = ['Admin','Gerente','Funcionário']

  useEffect(() => {
    async function focusSreen() {
      if (isFocused) {
        setIsLoading(true)
        setEmployee(null)
        if(route.params.id){
          reset({ email: route.params.email, permissionsID: String(route.params.permissionsID) })
         
          if (route.params.Avatar) {
            setUserAvatar(api.defaults.baseURL + "/" + route.params.Avatar.split("\\")[1])
          }else setUserAvatar(null)
        }else{
          reset({ email:'', permissionsID: ''})
          setEmployee(null)
          setUserAvatar(null)
        }
        setIsLoading(false)
      }
    }
    
    focusSreen()
  }, [isFocused])
  

    async function handleCompanyRegister(data: FormData) {
      try {
        
        const dataUpdated = {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
       
        }
        const result = await api.patch(`users/${user?.id}/change-password`, dataUpdated)
        
        if (result.status==201) {
         
          Alert.alert("Perfil","Senha alterada com sucesso")
        }
      } catch (error:any) {
        alert(error.response.data.message);
        
      }
  
    }
  return (
   isLoading ?(<View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
   <ActivityIndicator size="large" color="#666"/>
 </View>):( <View style={styles.container}>
      
      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
     
        
        {userAvatar && <Image source={{ uri: userAvatar }} style={{ alignSelf:'center',height: 250,width: 250 ,borderRadius:200}} />}
        <ControlledInput  editable={false} defaultValue={route.params.employeeName ?route.params.employeeName:'Não cadastrado'}name="name" control={control} labelName="Nome" />
        <ControlledInput  editable={false} name="email" control={control} labelName="E-mail" />
        <ControlledInput  editable={false} defaultValue={perm[Number(route.params.permissionsID)-1]} name="permission" control={control} labelName="Permissão" />
        <ControlledInput  secureTextEntry={true} editable={true}  name="oldPassword" control={control} labelName="Senha atual" />
        <ControlledInput  secureTextEntry={true} editable={true}  name="newPassword" control={control} labelName="Nova senha" />
        <View style={{ marginTop: 20 , marginBottom: 40 }}>
          <ButtonIcon onPress={handleSubmit(handleCompanyRegister)} color={theme.color.primary} title='Alterar senha' activeOpacity={0.8} />
        </View>
        </ScrollView>
    </View>)
  );
}