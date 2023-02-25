export interface AuthRequestCode {
  telegramUsername: string
}

export interface AuthRequestCodeResponse {
  token: string
}

export interface AuthLogin {
  code: string
  token: string
}

export interface AuthLoginResponse {
  accessToken: string
  refreshToken: string
}
