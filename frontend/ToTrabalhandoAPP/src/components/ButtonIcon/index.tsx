import React from 'react';
import { Text, Image, View, TouchableOpacity, TouchableOpacityProps, ColorValue} from 'react-native';

// import DiscordImg from '../../assets/discord.png'
import {styles} from './styles'
interface IButtonIconProps extends TouchableOpacityProps{
  title:string,
  color:ColorValue
  height?:number
}
export function ButtonIcon({title,color ,height,...rest}:IButtonIconProps){
  if(!height){
    height =70
  }
  return(
    <TouchableOpacity style={[styles.container,{backgroundColor:color,height:height}]} {...rest} >
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
  
}