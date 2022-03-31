import React, { useState } from 'react';
import { Text, View, Image, StatusBar,TextInput,TouchableOpacity,ScrollView,TextProps,TextInputProps } from 'react-native';
import {styles} from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
export type IInputProps = TextInputProps &{
  labelName:string,
}
export function Input({labelName,...rest}:IInputProps) {
 
  return (
    <>
      <Text style={styles.titleLabel}>{labelName}</Text>
      <TextInput style={styles.input}{...rest}></TextInput>
    </>
  );
}
