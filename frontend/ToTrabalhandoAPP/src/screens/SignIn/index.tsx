import React, { useState } from 'react';
import { Text, View, Image, StatusBar,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import {styles} from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
export function SignIn() {
  const [userName,setUserName] = useState('');


  return (
    <View style={styles.container}>
      <Image 
        source={IllustrationImg} 
        style={styles.image}
        resizeMode='stretch'
      
      />
      <Text style={styles.titleIcon}>
        <Text style={styles.titleIconTo}>To</Text>Trabalhando
      </Text>

      <View style={styles.content} >
        {/* <Text style={styles.title}>
          Confirme {`\n`}
          que você esta {`\n`}
          trabalhando
        </Text> */}
          
          <TextInput style={styles.inputLogin} placeholder="Nome de usuário" ></TextInput>
          <TextInput style={styles.inputPassword}placeholder="Digite sua senha"></TextInput>
        
          <TouchableOpacity  activeOpacity={0.8}>
     
          <Text style={styles.createAccount}>Cadastrar empresa</Text>
        </TouchableOpacity>
        
      


        <ButtonIcon color={"#ffff"}title='Continuar' activeOpacity={0.8}/>

      </View>
    </View>
  );
}

