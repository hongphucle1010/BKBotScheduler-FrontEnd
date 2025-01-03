export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  msg: string
  access_token: string
}
