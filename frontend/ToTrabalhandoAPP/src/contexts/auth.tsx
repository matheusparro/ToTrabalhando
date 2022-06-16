import { createContext, ReactNode, useState, useEffect,useContext } from 'react'
import {Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from './../services/api'
interface AuthProviderProps {
  children: ReactNode
  
}

interface AuthContextData{
  signed: boolean
  user: User | null
  loading: boolean
  signIn: (email:string,password:string) => Promise<void>;
  signOut: () =>void;
}
interface Employee {
  name:string
}
interface User {
  id:string,
  employee:Employee | null
  email:string,
  companyId:string,
  Avatar:string
  company:{
    fantasyName:string
  }
  permissions:{
    id:string,
    name:string
  }
  employeeId:string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({
  children,
}:AuthProviderProps) {
  const [user,setUser] = useState<User | null>(null)
  const [loading,setLoading] = useState(true)

  useEffect(() =>{
    async function loadStoragedData(){
      const storageUser = await AsyncStorage.getItem('@toTrabalhandoAuth:user')
      const storageToken = await AsyncStorage.getItem('@atoTrabalhandoToken:token')

      if (storageUser && storageToken ){
        api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }
      setLoading(false)
    }
    loadStoragedData();
  },[])
  async function signIn(email:string,password:string){
    try{
    const response = await api.post('/auth', {"email":email,"password":password})
    const { token, userFind } = response.data
    if(userFind && token){
      setUser(userFind)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      await AsyncStorage.setItem('@toTrabalhandoAuth:user',JSON.stringify(userFind))
      await AsyncStorage.setItem('@atoTrabalhandoToken:token',token)
    }
  }catch(error:any){
    Alert.alert("Login",error.response.data.message);
  }
  }

  async function signOut(){
    await AsyncStorage.clear().then(()=>{
      setUser(null)
    })
   
  }


   return (
    <AuthContext.Provider value={{
      signed: !!user,
      user:user,
      signIn,
      signOut,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext)
  return context
}