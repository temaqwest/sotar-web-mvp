import { axiosInstance } from '@/network'
import { useGlobalStore } from '@/stores/global'
import type {
  AuthLogin,
  AuthLoginResponse,
  AuthRequestCode,
  AuthRequestCodeResponse,
} from '@/services/AuthService/types'

const globalStore = useGlobalStore()

const URI = `https://${globalStore.globalUrl}/auth`

class AuthService {
  requestCode(data: AuthRequestCode): Promise<AuthRequestCodeResponse> {
    return axiosInstance
      .post(`${URI}/request-code`, data)
      .then(({ data }) => data)
  }

  login(data: AuthLogin): Promise<AuthLoginResponse> {
    return axiosInstance.post(`${URI}/login`, data).then(({ data }) => data)
  }
}

export default new AuthService()
