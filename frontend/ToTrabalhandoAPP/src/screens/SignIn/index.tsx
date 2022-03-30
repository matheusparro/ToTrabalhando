import React, { useState } from 'react';
import { Text, View, Image, StatusBar } from 'react-native';
import {styles} from './styles'
import IllustrationImg from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon';
export function SignIn() {
  const [userName,setUserName] = useState('');


  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Image 
        source={IllustrationImg} 
        style={styles.image}
        resizeMode='stretch'
      
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Confirme {`\n`}
          que você esta {`\n`}
          trabalhando
        </Text>

        <Text style={styles.subtitle}>
          Tenha acesso ao seu desempenho {`\n`}
          no trabalho
        </Text>

        <ButtonIcon title='Continuar' activeOpacity={0.8}/>

      </View>
    </View>
  );
}

