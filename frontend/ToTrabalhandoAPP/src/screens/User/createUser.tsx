import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput,StyleSheet,Button, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useForm } from 'react-hook-form'
import { Picker } from "@react-native-picker/picker";
import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import axios from 'axios'
import { RouteProp, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

type FormData = {

  email: string,
  password: string
  userAvatar:{
    uri: string | null,
    type: string,
    name: string
  },
  companyId:string | undefined,
}


type ParamList = {
  Detail: {
    id:string
    email:string,
    password:string,
    Avatar:string,
  };
};

export function CreateUser() {
  const { control, handleSubmit,reset } = useForm<FormData>()
  const isFocused = useIsFocused();
  const {user} = useAuth()
  const [userAvatar, setUserAvatar] = useState<any>(null);
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
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
  let config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
 
  useEffect(() =>{
    
    async function focusSreen(){
      setUserAvatar(null)
      if(isFocused){
       if(route.params.Avatar){
         console.log("Oi")
        console.log(api.defaults.baseURL+"/"+route.params.Avatar.split("\\")[1])
         setUserAvatar(api.defaults.baseURL+"/"+route.params.Avatar.split("\\")[1])
       }
      }
    }
    reset()
    focusSreen()
  },[isFocused])
  async function handleUserRegister(data: FormData){
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
      const teste:any =   {uri: String(userAvatar), type: 'image/jpeg', name: "teste" }
        formData.append("userAvatar",teste);
        formData.append("companyId",String(data.companyId));
        formData.append("email",data.email);
        formData.append("password",data.password);


      console.log(formData)
      const result = await await api.post('http://10.0.2.2:3333/users/',formData,config)
      
      if (result.status==201) {
       
        alert("Usuário criado com sucesso")
        new Promise((res) => setTimeout(()=>  navigation.navigate("Users" as never, {} as never) , 1));
      }
    } catch (error:any) {
      Alert.alert("Login",error.response.data.message);
    }
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput  value={route.params.email} name="email" control={control} labelName="E-mail" />
        {!route.params.email && <ControlledInput name="password" control={control} labelName="Senha" />}
        <Button title="Avatar" onPress={pickImage} />
        {userAvatar && <Image source={{ uri: userAvatar }} style={{height: 200 }} />}
        <Pressable onPress={() => alert('Hi!')}>
          <ControlledInput editable={false} name="employee" control={control} keyboardType="numeric" labelName="Funcionário" />
          </Pressable>
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleUserRegister)}color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}