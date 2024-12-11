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

interface LogInWithGoogleOneTapResponse {
  id: string
  access_token: string
  refresh_token: string
}
