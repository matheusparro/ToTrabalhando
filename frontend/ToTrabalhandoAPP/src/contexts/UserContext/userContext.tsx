import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

interface UserContextData {

  signed: boolean,
  signIn():Promise<void>
  user: UserProps | null
  company: CompanyProps | null
  signOut():Promise<void>
}
interface UserProps {

  id: number,
  name?: string,
  email?: string,
  token: string,
  refreshToken: {
    id: number,
  }

}
interface CompanyProps {
  id: number,
  fantasyName: string,
  cnpj: string,
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UsersProvider({
  children,
}: UserProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [company, setCompany] = useState<CompanyProps | null>(null)
  
  async function signOut(){
    setUser(null)
    setCompany(null)
  }
  async function signIn():Promise<void> {
    
    // let data = {
    //   email: email,
    //   password: password
    // }
    // try {
    //   let response = await axios.post('http://10.0.2.2:3333/auth', data)
    //   const {
    //     token,
    //     refreshToken } = response.data
    //   if (response.data) {
    //     response = await axios.get(`http://10.0.2.2:3333/users/${refreshToken.userId}`)
    //   }
    //   if (response.data) {
       
    //     const authFound: UserProps = {
    //       id: refreshToken.userId,
    //       email: response.data.email,
    //       //name: response.data.name,
    //       token,
    //       refreshToken: {
    //         id: refreshToken.id
    //       }
    //     }
    //     const { companyEmployers } = response.data
    //     response = await axios.get(`http://10.0.2.2:3333/company/${companyEmployers.companyId}`)
    //     if (response.data) {
    //       const companyFound: CompanyProps = {
    //         cnpj: response.data.cnpj,
    //         fantasyName: response.data.fantasyName,
    //         id: response.data.id
    //       }
    //       setUser(authFound)
    //       setCompany(companyFound)
    //      return true
    //     }
    //   }

    // } catch (error:any) {
    //   console.log("AQUi")
    //   alert(error.response.data.message);
    //   return false
    // }
    console.log("oi")
  }

  return (
    <UserContext.Provider value={{
      signed: !!user && !!company,
      signIn,
      user,
      company,
      signOut


    }}>
      {children}
    </UserContext.Provider>
  )
}