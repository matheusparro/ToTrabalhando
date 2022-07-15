import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Controller, useForm } from 'react-hook-form'
import { PickerIOS,Picker } from "@react-native-picker/picker";
import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { ControlledInput } from '../../components/ControlledInput';
import { theme } from '../../global/styles/theme'
import { RouteProp, useIsFocused, useNavigation, useRoute, } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
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

type ParamList = {
  Detail: {
    userId:string,
    id:string,
    name:string,
    pis:string,
    cpf:string
    departmentId:string,
    appointmentConfigurationId:string
  };
};

export function CreateEmployee() {
  const { control, handleSubmit,reset } = useForm<FormData>()
  const navigation = useNavigation()
  const [allAppointmentConf, setAllAppointmentConf] = useState<[allFields] | null>(null)
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const { user } = useAuth()
  const [allDepartments, setAllDepartments] = useState<[allFields] | null>(null)
  const isFocused = useIsFocused();
  
  async function handleEmployeeRegister(data: FormData) {
    try {
      if(data.departmentId == 0 ||data.departmentId ==null || isNaN(data.departmentId)){
        Alert.alert("Funcionário","Selecione um departamento *Obrigatório")
        return
      }
      if(data.appointmentConfigurationId ==0 ||data.appointmentConfigurationId ==null || isNaN(data.appointmentConfigurationId)){
        Alert.alert("Funcionário","Selecione um apontamento de configuração *Obrigatório")
        return
      }
      if(data.name =='' ||data.name ==null){
        Alert.alert("Funcionário","Digite um nome *Obrigatório")
        return
      }
      if(data.cpf =='' ||data.cpf ==null){
        Alert.alert("Funcionário","Digite um cpf  *Obrigatório")
        return
      }
      if(data.pis =='' ||data.pis ==null){
        Alert.alert("Funcionário","Digite o n° pis *Obrigatório")
        return
      }
      if(route.params.userId){
        data.userId = route.params.userId
        if(!route.params.id){
          const result = await api.post('/employee/', data)
          if (result.status==201) {
          
           Alert.alert("Funcionário","Funcionário criado com sucesso")
           // new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 1));
          }
        }else{
          const result = await api.put(`/employee/${route.params.id}`, data)
          
          if (result.data) {
          
            Alert.alert("Funcionário","Atualizado com sucesso")
            //new Promise((res) => setTimeout(()=>  navigation.navigate("EmloyeeInsert" as never, {} as never) , 1));
          }
        }
        
      }else Alert.alert("Funcionário","Falha ao criar funcionário")
    } catch (error:any) {
      alert(error.response.data.message);
      
    }

  }
  useEffect(() =>{
    async function allFields(){
      if(isFocused){
        let result = await api.get(`/company/${user?.companyId}/department/all`)
        if (result.data) {
        
          setAllDepartments(result.data)
        }
         result = await api.get(`/company/${user?.companyId}/appointment-configuration/all`)
        if (result.data) {
          setAllAppointmentConf(result.data)
        }
        if(route.params.userId){
          reset({name:route.params.name,appointmentConfigurationId:parseInt(route.params.appointmentConfigurationId),cpf:route.params.cpf,pis:route.params.pis,departmentId:parseInt(route.params.departmentId)})
        }else reset()

      }
    }

    allFields()
  },[isFocused])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <ControlledInput defaultValue={route.params.name} name="name" control={control} keyboardType="default" labelName="Nome" />
        <ControlledInput defaultValue={route.params.cpf} name="cpf" control={control} keyboardType="number-pad" labelName="Cpf" />
        <ControlledInput defaultValue={route.params.pis} name="pis" control={control} keyboardType="number-pad" labelName="Pis" />
        <Text style={styles.titleLabel}>Departamento</Text>  
        <Controller
      name={"departmentId"}
      control={control}
      render={({field})=>(
        <PickerIOS
        selectedValue={field.value}
        onValueChange={(date) => field.onChange(date)}

        //mode="dialog" // Android only
        style={styles.input}
        collapsable        
      >
        <PickerIOS.Item label="Selecione" value="" />
        {allDepartments? allDepartments.map(item=>{
          return( <PickerIOS.Item  key={item?.id} label={item?.name} value={item?.id} />)
        }):null}
        
      </PickerIOS>
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
    <Pressable onPress={()=> navigation.navigate("EmployeeAppointments" as never, {employeeId:route.params.id} as never)}>
      <ControlledInput defaultValue={"Vizualiar apontamentos"} editable={false} name="appointments" control={control} keyboardType="numeric" labelName="Apontamentos" />    
    </Pressable>
        <View style={{ marginTop: 20 }}>
          <ButtonIcon onPress={handleSubmit(handleEmployeeRegister)} color={theme.color.primary} title='Salvar' activeOpacity={0.8} />
        </View>
      </ScrollView>

    </View>
  );
}