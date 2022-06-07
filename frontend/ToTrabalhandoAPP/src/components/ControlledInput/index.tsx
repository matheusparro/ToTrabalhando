import React from 'react';
import {Control,Controller, useForm,} from 'react-hook-form'
import { Input,IInputProps } from '../../components/Input';
type Props = IInputProps &{
  control:Control<any>;
  name:string;
  screenValue?:string

}
export function ControlledInput({control,name,screenValue,...rest}:Props){
  const {register} = useForm()
  return(
    <Controller
      name={name}
      control={control}
      render={({field:{onChange,ref={...register(name)},value}})=>(
        <Input 
          {...ref}
          onChange={onChange}
          value={value}
          {...rest}
        >
         
        </Input>
      )}
    />
  )
}

