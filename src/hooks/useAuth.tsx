import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session'
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'


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
  },
  type?: string;
  errorCode?: string;
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

const userStorage = '@nlwheat:user'
const tokenStorage = '@nlwheat:token'
const client_id = '6081422c76e2dd95cdce'
const scope = 'read:user'


const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(true)

  const signIn = async () => {
    try {
      setIsSigningIn(true)
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`

      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse
      //console.log(authSessionResponse)

      if (authSessionResponse.type === 'success' && authSessionResponse.errorCode !== 'login-declined') {

        const authResponse = await api.post<AuthResponse>('/authenticate', { code: authSessionResponse.params.code })
        const { user, token } = authResponse.data

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await AsyncStorage.setItem(userStorage, JSON.stringify(user))
        await AsyncStorage.setItem(tokenStorage, token)

        setUser(user)

      }

    } catch (err) {
      console.error(err)
    } finally {
      setIsSigningIn(false)
    }

  }

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.multiRemove([
      userStorage,
      tokenStorage
    ])
  }

  useEffect(() => {
    const loadUserStorageData = async () => {
      const userRes = await AsyncStorage.getItem(userStorage)
      const tokenRes = await AsyncStorage.getItem(tokenStorage)


      //console.log(userRes, tokenRes)

      if (userRes && tokenRes) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenRes}`

        setUser(JSON.parse(userRes))

      }
      setIsSigningIn(false)
    }

    loadUserStorageData();
  }, [])


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