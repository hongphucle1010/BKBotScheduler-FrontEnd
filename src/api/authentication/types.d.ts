import { TokenResponse } from '@react-oauth/google'
interface UserInfoResponse {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  hd: string
}

interface LogInWithGoogleOneTapRequest {
  credential: string | undefined
}

interface LogInWithGoogleResponse extends UserInfoResponse {
  access_token: string
  refresh_token: string
}

type GoogleLoginCodeResponse = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>

interface GoogleAuthPayload {
  iss: string
  azp: string
  aud: string
  sub: string
  hd: string
  email: string
  email_verified: boolean
  nbf: number
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
  jti: string
}
