import React from 'react';
import {Control,Controller} from 'react-hook-form'
import { Input,IInputProps } from '../../components/Input';
type Props = IInputProps &{
  control:Control<any>;
  name:string;
  screenValue?:string

}
export function ControlledInput({control,name,screenValue,...rest}:Props){
  return(
    <Controller
      name={name}
      control={control}
      render={({field:{onChange,value=screenValue}})=>(
        <Input 
          onChangeText={onChange}
          value={value}
          {...rest}
        >
         
        </Input>
      )}
    />
  )
}