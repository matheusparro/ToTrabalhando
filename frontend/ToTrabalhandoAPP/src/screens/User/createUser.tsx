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



export function CreateUser() {
  const { control, handleSubmit, reset, register } = useForm<FormData>()
  const isFocused = useIsFocused();
  const { user } = useAuth()
  const [userAvatar, setUserAvatar] = useState<any>(null);
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const [employee, setEmployee] = useState<employee | null>(null)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(result);

    if (!result.cancelled) {
      setUserAvatar(result.uri);
    }
  };
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  useEffect(() => {
    async function focusSreen() {
      if (isFocused) {
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
          console.log("oii")
        }
      }
    }
    
    focusSreen()
  }, [isFocused])

  async function handleUserRegister(data: FormData) {
    try {
      
      data.userAvatar = {
        uri: userAvatar,
        type: "image/jpeg",
        name: "teste.jpg"
      }  
      data.companyId = user?.companyId

      let localUri = String(userAvatar);
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(String(filename));

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects

      const teste: any = { uri: String(userAvatar), type: 'image/jpeg', name: "teste" }
      formData.append("userAvatar", teste);
      formData.append("companyId", String(data.companyId));
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("permissionsID", data.permissionsID);


      let result = null

      if (!route.params.id) {
        result = await await api.post('/users/', formData, config)
      } else {
        result = await await api.put(`/users/${route.params.id}`, formData, config)
      }
      if (result.status == 201) {

        Alert.alert("Usuário","Criado com sucesso")
        new Promise((res) => setTimeout(() => navigation.navigate("Users" as never, {} as never), 1));
      }
    } catch (error: any) {
      Alert.alert("Login", error.response.data.message);
    }

  }
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <ScrollView>
        <ControlledInput  name="email" control={control} labelName="E-mail" />
        {!route.params.email && <ControlledInput secureTextEntry={true} name="password" control={control} labelName="Senha" />}
        <ButtonIcon  height={45}  color={'#7a1f9b'}  title="Avatar" onPress={pickImage} />
        {userAvatar && <Image source={{ uri: userAvatar }} style={{ height: 200 }} />}

        <Text style={styles.titleLabel}>Permissão</Text>

        <Controller
        
          name={"permissionsID"}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Picker
              
              selectedValue={value}
              onValueChange={(date) => onChange(date)}
              mode="dropdown" // Android only
              style={styles.input}
              


            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item key={1} label={"Admin"} value={'1'} />
              <Picker.Item key={2} label={"Gerente"} value={'2'} />
              <Picker.Item  key={3} label={"Funcionário"} value={'3'} />

            </Picker>
          )}
        />
        {route.params.id && <Pressable onPress={() => {
          if(route.params.employeeId){
            navigation.navigate("EmloyeeInsert" as never, {userId:route.params.id,id:employee?.id,name:employee?.name,cpf:employee?.cpf,pis:employee?.pis,departmentId:employee?.departmentId,appointmentConfigurationId:employee?.appointmentConfigurationId} as never)
          }else
          navigation.navigate("EmloyeeInsert" as never,{userId:route.params.id} as never)
        }}>
          <ControlledInput defaultValue={employee?.name ?employee?.name:"Clique para cadastrar"} editable={false} name="employee" control={control} keyboardType="numeric" labelName="Funcionário" />
        </Pressable>}
        <View style={{ marginTop: 20 , marginBottom: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleUserRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
        </ScrollView>
      </View>
    </View>
  );
}