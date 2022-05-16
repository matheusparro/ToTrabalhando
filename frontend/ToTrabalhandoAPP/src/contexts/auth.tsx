import { createContext, ReactNode, useState, useEffect,useContext } from 'react'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from './../services/api'
interface AuthProviderProps {
  children: ReactNode
  
}

interface AuthContextData{
  signed: boolean
  user: User | null
  loading: boolean
  signIn: () => Promise<void>;
  signOut: () =>void;
}

interface User {
  name:string,
  email:string,
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
    }
    loadStoragedData();
  },[])
  async function signIn(){
    
    const response = await api.post('http://10.0.2.2:3333/auth', {"email":"mathparro@gmail.com","password":"123"})
    const { token, userFind } = response.data
    setUser(userFind)

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    await AsyncStorage.setItem('@toTrabalhandoAuth:user',JSON.stringify(userFind))
    await AsyncStorage.setItem('@atoTrabalhandoToken:token',token)
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