import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

interface UserContextData {
 
  signed: boolean,
  signIn(email: string, password: string): Promise<void>
  user:UserProps | null
}
interface UserProps {

  id: number,
  name?: string,
  email?: string,
  token:string,
  refreshToken: {
		id: number,
  }

}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UsersProvider({
  children,
}: UserProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)

  

  async function signIn(email: string, password: string) {
 
    let data={
      email:email,
      password:password
    }
    try {
      const response = await axios.post('http://10.0.2.2:3333/auth', data)
      const {
        token,
        refreshToken} = response.data
      const authFound:UserProps={
        id:refreshToken.userId,
        email:email,
        token,
        refreshToken:{
          id:refreshToken.id
        }
      }
      setUser(authFound)
    
    } catch (error) {
      console.log("DEUERRO",error)
    }
 

  }

  return (
    <UserContext.Provider value={{
      signed: !!user,
      signIn,
      user

    }}>
      {children}
    </UserContext.Provider>
  )
}