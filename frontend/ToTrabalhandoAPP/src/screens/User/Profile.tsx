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
  password: string
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
    employeeId:string
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



export function Profile() {
  const { control, handleSubmit, reset, register } = useForm<FormData>()
  const isFocused = useIsFocused();
  const { user } = useAuth()
  const [userAvatar, setUserAvatar] = useState<any>(null);
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const [employee, setEmployee] = useState<employee | null>(null)
  const [isLoading,setIsLoading] = useState(false)


  useEffect(() => {
    async function focusSreen() {
      if (isFocused) {
        setIsLoading(true)
        setEmployee(null)
        if(route.params.id){
          reset({ email: route.params.email, permissionsID: String(route.params.permissionsID) })
          if(route.params.employeeId){
           
            const result = await api.get(api.defaults.baseURL + `/employee/${route.params.employeeId}`)
            setEmployee(result.data)
          }
         
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

  return (
   isLoading ?(<View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
   <ActivityIndicator size="large" color="#666"/>
 </View>):( <View style={styles.container}>
      
      <View style={styles.content}>
        <ScrollView>
        <ControlledInput  editable={false} name="email" control={control} labelName="E-mail" />
        {!route.params.email && <ControlledInput name="password" control={control} labelName="Senha" />}
        <ButtonIcon height={45} color={'#7a1f9b'}  title="Avatar" />
        {userAvatar && <Image source={{ uri: userAvatar }} style={{ height: 200 }} />}

        <Text style={styles.titleLabel}>Permissão</Text>

        <Controller
          name={"permissionsID"}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Picker
              enabled={false}
              selectedValue={value}
              onValueChange={(date) => onChange(date)}
              mode="dropdown" // Android only
              style={styles.input}



            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item key={1} label={"Admin"} value={'1'} />
              <Picker.Item key={2} label={"Gerente"} value={'2'} />
              <Picker.Item key={3} label={"Funcionário"} value={'3'} />
            </Picker>
          )}
        />

          <ControlledInput  defaultValue={employee?.name ?employee?.name:"Solicite seu cadastro"} editable={false} name="employee" control={control} keyboardType="numeric" labelName="Funcionário" />
        </ScrollView>
      </View>
    </View>)
  );
}