import React from 'react';
import { Text, Image, View, TouchableOpacity, TouchableOpacityProps, ColorValue} from 'react-native';

// import DiscordImg from '../../assets/discord.png'
import {styles} from './styles'
interface IButtonIconProps extends TouchableOpacityProps{
  title:string,
  color:ColorValue
}
export function ButtonIcon({title,color ,...rest}:IButtonIconProps){
  return(
    <TouchableOpacity style={[styles.container,{backgroundColor:color}]} {...rest} >
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
  
}