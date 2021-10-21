import React, { createContext, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session'
import { api } from '../services/api';


type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthResponse = {
  token: string;
  user: User;
}
type AuthorizationResponse = {
  params: {
    code?: string;
  }
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const client_id = '6081422c76e2dd95cdce'
  const scope = 'read:user'


  const signIn = async () => {
    setIsSigningIn(true)
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`

    const { params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

    if (params && params.code) {

      const authResponse = await api.post<AuthResponse>('/authenticate', { code: params.code })

      const { user, token } = authResponse.data

      console.log(authResponse.data)



    }

    setIsSigningIn(false)

  }

  const signOut = async () => {

  }


  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      isSigningIn,
    }}>
      {children}
    </AuthContext.Provider>
  )

}


export const useAuth = () => {
  return useContext(AuthContext)
}