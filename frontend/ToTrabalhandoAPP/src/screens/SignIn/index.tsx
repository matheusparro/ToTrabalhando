import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, StatusBar,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import {styles} from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import {theme} from '../../global/styles/theme'
import { UserContext } from '../../contexts/UserContext/userContext';
import {useAuth} from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
export function SignIn() {
  const [email,setEmail] = useState('mathparro@gmail.com');
  const [password,setPassword] = useState('123');
   const {signed,signIn,user} = useAuth()
  //const {signIn,signed,signOut} = useContext(UserContext)
   const navigation = useNavigation()
  // async function handleSignIn(){
  //   const result = await signIn(email,password)
  //   if(result){
  //     navigation.navigate("Home" as never, {} as never)
  //   }r
  // }
  console.log(signed)
  console.log(user)
   async function handleSignIn(){
      
      signIn(email,password)
    }
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
          
          <TextInput onChangeText={setEmail} value={email} style={styles.inputLogin} placeholder="Email" ></TextInput>
          <TextInput secureTextEntry={true}  onChangeText={setPassword} value={password} style={styles.inputPassword}placeholder="Digite sua senha"></TextInput>
        
          <TouchableOpacity  activeOpacity={0.8}>
            <View style={{display: 'flex', flexDirection: 'row',justifyContent:"space-between",padding:5}}>
          <Text onPress={()=>{ navigation.navigate("ForgotPassword" as never, {} as never)}}style={styles.createAccount}>Recuperar senha</Text>
          <Text onPress={()=>{ navigation.navigate("Company" as never, {} as never)}}style={styles.createAccount}>Cadastrar empresa</Text>
          </View>
        </TouchableOpacity>
        
      


        <ButtonIcon onPress={handleSignIn} color={theme.color.primary}title='Continuar' activeOpacity={0.8}/>

      </View>
    </View>
  );
}

