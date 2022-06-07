import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form'
import { Picker } from "@react-native-picker/picker";
import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import axios from 'axios'
import { useIsFocused, useNavigation, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
type FormData = {

  name: string,
  cpf: string
  pis: string,
  departmentId: number,
  appointmentConfigurationId: number,
  userId:string,

}
interface allFields{
  name:string,
  id:string
}


export function CreateEmployee() {
  const { control, handleSubmit } = useForm<FormData>()
  const navigation = useNavigation()
  const [department, setDepartment] = useState("")
  const [allAppointmentConf, setAllAppointmentConf] = useState<[allFields] | null>(null)
  
  const { user } = useAuth()
  const [allDepartments, setAllDepartments] = useState<[allFields] | null>(null)
  const isFocused = useIsFocused();
  
  async function handleEmployeeRegister(data: FormData) {
    try {
      // const result = await axios.post('http://10.0.2.2:3333/employee/', data)
      
      // if (result.data) {
       
      //   alert("Funcionário criado com sucesso")
      //   //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 1));
      // }
    } catch (error:any) {
      alert(error.response.data.message);
      
    }

  }
  useEffect(() =>{
    async function allFields(){
      if(isFocused){
        let result = await axios.get(`http://10.0.2.2:3333/company/${user?.companyId}/department/all`)
        if (result.data) {
        
          setAllDepartments(result.data)
          alert(result.data)
        }
         result = await axios.get(`http://10.0.2.2:3333/company/${user?.companyId}/appointment-configuration/all`)
        if (result.data) {
          setAllAppointmentConf(result.data)
          alert(result.data)
        }


      }
    }

    allFields()
  },[isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ControlledInput name="name" control={control} keyboardType="numeric" labelName="Nome" />
        <ControlledInput name="cpf" control={control} labelName="Cpf" />
        <ControlledInput name="pis" control={control} labelName="Pis" />
        <Text style={styles.titleLabel}>Departamento</Text>  
        <Controller
      name={"departmentId"}
      control={control}
      render={({field})=>(
        <Picker
        selectedValue={field.value}
        onValueChange={(date) => field.onChange(date)}
        mode="dropdown" // Android only
        style={styles.input}
        
      >
        <Picker.Item label="Selecione" value="" />
        {allDepartments? allDepartments.map(item=>{
          return( <Picker.Item  key={item?.id} label={item?.name} value={item?.id} />)
        }):null}
        
      </Picker>
      )}
    />
      <Text style={styles.titleLabel}>Configuração de Apontamento</Text>  
      <Controller
      name={"appointmentConfigurationId"}
      control={control}
      render={({field})=>(
        <Picker
        selectedValue={field.value}
        onValueChange={(date) => field.onChange(date)}
        mode="dropdown" // Android only
        style={styles.input}
        
      >
        <Picker.Item label="Selecione" value="" />
        {allAppointmentConf? allAppointmentConf.map(item=>{
          return( <Picker.Item  key={item?.id} label={item?.name} value={item?.id} />)
        }):null}
        
      </Picker>
      )}
    />

        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleEmployeeRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );
}