import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableWithoutFeedback, Pressable, Modal, TextInput, Platform } from 'react-native';
import { styles } from './styles'
import { useAuth } from '../../contexts/auth';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import api from '../../services/api'
import moment from 'moment';
import { theme } from '../../global/styles/theme';
import { ButtonIcon } from '../../components/ButtonIcon';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { ControlledInput } from '../../components/ControlledInput';
import { useForm } from 'react-hook-form';
import { printToFileAsync } from 'expo-print';
import * as Sharing from "expo-sharing";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from "expo-media-library";
import DateTimePicker from 'react-native-modal-datetime-picker';
interface appointments {

  id: string,
  appointmentTime: string,
  appointmentTimeEnd: string,
  appointmentDate: string,
  status: string,
  reason: string,
  employeeId: string,
  createdAt: string,
  updatedAt: string,

}

interface allDepartments {
  data: string,
  situacao: number
  appointments: appointments[]
  name:string
}
type ParamList = {
  Detail: {
    employeeId: string,
    name:string
  };
};


export function Appointment() {

  const [allAppointments, setAllAppointments] = useState<allDepartments[] | null>(null)
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const { control, handleSubmit, reset, register } = useForm<FormData>()
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState('')
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [startTime, setStartTime] = useState<string>('');
  const [startTimeEnd, setStartTimeEnd] = useState<string>('');
  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const showPicker = () => {
    setIsPickerShow(true);
  };
  const showPicker2 = () => {
    setIsPickerShow2(true);
  };
  const setDateChange = (date: Date | undefined) => {
    setIsPickerShow(false)
    setStartTime(String(date))

  };
  const setDateChange2 = (date: Date | undefined) => {
    setIsPickerShow2(false)
    setStartTimeEnd(String(date))

  };
  const styles2 = StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 60,
      justifyContent: "center",
      alignSelf: 'center',
      textAlign: 'center',
      alignContent: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 50,
    },
    pickedDateContainer: {
      padding: 20,
      backgroundColor: '#eee',
      borderRadius: 10,
    },
    pickedDate: {
      fontSize: 18,
      color: 'black',
    },
    btnContainer: {
      padding: 30,
    },
    // This only works on iOS
    datePicker: {
      width: 320,
      height: 60,
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'absolute',
      backgroundColor: "#fff"
    },
  })
  const { user } = useAuth()
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  useEffect(() => {
    async function allDepartmentsFound() {
      if (isFocused) {

        let idToFind = ''
        if (route.params && route.params.employeeId) {
          idToFind = route.params.employeeId
        } else {
          idToFind = String(user?.employeeId)
        }
        const result = await api.get(`employee/${idToFind}/appointment`)

        if (result.data) {
          setAllAppointments(result.data)

        }
      }
    }
    allDepartmentsFound()
  }, [isFocused])
  async function returnFormatedDate(data: string) {

    let teste = moment(data);
    var offset = moment().utcOffset();

    const teste2 = teste.tz('America/Sao_Paulo')
    return String(teste2.format('YYYY-MM-DD'))
  }

  async function pdf() {
    try {

      const appointmentsFiltered = await allAppointments?.filter((item) => {

        if (moment(startTime).format('YYYY-MM-DD') >= moment(item.data).format('YYYY-MM-DD') && moment(startTimeEnd).format('YYYY-MM-DD') <= moment(item.data).format('YYYY-MM-DD')) {
          return item
        }
        if(startTime =='' && startTimeEnd =='') return item

      })
      console.log("###############################################")
      appointmentsFiltered?.map(item=>{
        console.log(item?.data)
      })
      const html = `
      <html>
      
      <head>
<style>
.myDiv {
  border: #a74abf;
  background-color: #cdade6;
  text-align: center;
}
</style>
</head>
        <body>
          <h1>Apontamentos - Funcionário(a) ${route.params.name}</h1>
          ${appointmentsFiltered?.map(item=>{
            return `<div class="myDiv"> 
                      <h2>${moment(item?.data).format('LL')}</h2>
                      ${item?.appointments.map(itemAp =>{
                        return `<p>${moment(itemAp.appointmentTime).format("HH:mm:ss") + " até " + moment(itemAp.appointmentTimeEnd).format("HH:mm:ss")}</p>`
                      }).join('')}
                    </div>`
          }).join('')}
          
          
        </body>
      </html>
      `
      // let generatePdf = async ()=> {
      const file = await printToFileAsync({
        html: html,
        base64:false
      })
      //await shareAsync(file.uri)
      const permission = await MediaLibrary.requestPermissionsAsync();

      await Sharing.shareAsync(file.uri);


      // }
    } catch (error) {

    }

  }
  function setModalVisibleTrue(){
    setModalVisible(true);
    setStartTime('')
    setStartTimeEnd('')
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentList}>
        <Modal
          transparent
          animationType="slide"
          //animationInTiming = {13900}
          // transparent={true}
          visible={modalVisible}
        // animationOut = "slide"


        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>De:</Text>
              <Pressable style={styles.modalText} onPress={() => showPicker()}>

                <Text style={{ textAlign: "center", color: "white", margin: 10 }}>{startTime && moment(startTime).format('YYYY-MM-DD')}</Text>
                {(isPickerShow && Platform.OS === 'ios') &&
                  <DateTimePicker
                    mode="date"
                    isVisible={isPickerShow}
                    onConfirm={setDateChange}
                    datePickerContainerStyleIOS={{
                      backgroundColor: 'purple'
                    }}
                    onCancel={() => { setIsPickerShow(false) }}
                  />}

              </Pressable>

              <Text>Até:</Text>

              <Pressable style={styles.modalText} onPress={() => showPicker2()}>
                <Text style={{ textAlign: "center", color: "white", margin: 10 }}>{startTimeEnd && moment(startTimeEnd).format('YYYY-MM-DD')}</Text>
                {(isPickerShow2 && Platform.OS === 'ios') &&
                  <DateTimePicker
                    mode="date"
                    isVisible={isPickerShow2}
                    onConfirm={setDateChange2}
                    datePickerContainerStyleIOS={{
                      backgroundColor: 'purple'
                    }}
                    onCancel={() => { setIsPickerShow(false) }}
                  />}
              </Pressable>
              <View style={{ marginTop: 1, marginBottom: 10 }}>
                <ButtonIcon onPress={pdf} color={theme.color.primary} title='Confirmar' activeOpacity={0.8} />
              </View>

              <ButtonIcon onPress={() => { setModalVisible(!modalVisible); }} color={theme.color.cancel} title='Voltar' activeOpacity={0.8} />
            </View>
          </View>
        </Modal>
        <View >
          <FlatList
            data={allAppointments}
            renderItem={({ item }) =>

              <Pressable key={item.data} onPress={() => {

                (route.params && route.params.employeeId) && navigation.navigate("ItemAppointment" as never, { data: item.data, appointments: item.appointments, situacao: item.situacao } as never)
              }}>
                <View style={styles.item}>

                  <Text style={{
                    marginTop: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: item.situacao == 1 ? "#0e5525" : item.situacao == 2 ? "#ae2222" : "#afb42c", paddingLeft: 20,

                  }}>{moment(item.data).tz('America/Sao_Paulo').format('LL')}</Text>
                  <Text style={{ color: item.situacao == 1 ? "#258543" : item.situacao == 2 ? "#ae2222" : "#afb42c", paddingLeft: 20, fontWeight: "bold" }}>{item.situacao == 1 ? "Concluído" : item.situacao == 2 ? "Falta" : "Incompleto"}</Text>
                </View>



              </Pressable>
            }
          />

        </View>

      </View>
      <Button onPress={ setModalVisibleTrue } style={styles2.fab}>
        Exportar apontamentos PDF
      </Button>
    </View>
  );

}
