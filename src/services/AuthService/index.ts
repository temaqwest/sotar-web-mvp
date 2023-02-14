import { axiosInstance } from '@/network'
import { useGlobalStore } from '@/stores/global'
import type { AuthRequestCode } from '@/services/AuthService/types'

const globalStore = useGlobalStore()

const URI = `https://${globalStore.globalUrl}/auth`

export class AuthService {
  requestCode(data: AuthRequestCode): Promise<any> {
    return axiosInstance.post(`${URI}/request-code`, data)
  }
}
