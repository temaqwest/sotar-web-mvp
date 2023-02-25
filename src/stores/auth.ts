import { defineStore } from 'pinia'
import type {
  AuthLogin,
  AuthLoginResponse,
  AuthRequestCode,
  AuthRequestCodeResponse,
} from '@/services/AuthService/types'
import AuthService from '@/services/AuthService'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken'))
  const refreshToken = ref(localStorage.getItem('refreshToken'))
  const userName = ref(localStorage.getItem('userName'))
  const isLogged = ref(!!localStorage.getItem('isLogged'))

  function requestCode(data: AuthRequestCode) {
    return AuthService.requestCode(data).then(
      async (response: AuthRequestCodeResponse) => {
        if (response?.token) {
          SET_USERNAME(data.telegramUsername)
          return Promise.resolve(response)
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  function login(data: AuthLogin) {
    return AuthService.login(data).then(
      async (response: AuthLoginResponse) => {
        SET_TOKENS(response)
        SET_LOGGED(true)
        return Promise.resolve(response)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  function logout() {
    SET_TOKENS({ refreshToken: '', accessToken: '' })
    SET_USERNAME('')
    SET_LOGGED(false)
  }

  function SET_USERNAME(name: string) {
    if (name.length < 5 || name.length > 32) {
      userName.value = ''
      localStorage.removeItem('userName')
      return
    }

    userName.value = name
    localStorage.setItem('userName', userName.value)
  }

  function SET_LOGGED(flag: boolean) {
    if (flag) {
      localStorage.setItem('isLogged', '1')
    } else {
      localStorage.removeItem('isLogged')
    }

    isLogged.value = flag
  }

  function SET_TOKENS(data: AuthLoginResponse) {
    if (data?.accessToken && data?.refreshToken) {
      refreshToken.value = data.refreshToken
      accessToken.value = data.accessToken
      localStorage.setItem('refreshToken', refreshToken.value)
      localStorage.setItem('accessToken', accessToken.value)
      return
    }

    refreshToken.value = ''
    accessToken.value = ''
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
  }

  return {
    requestCode,
    login,
    logout,
    SET_USERNAME,
    SET_LOGGED,
    SET_TOKENS,
  }
})
