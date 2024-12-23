interface ImportMetaEnv {
  VITE_BACKEND_URL: string
  VITE_GOOGLE_OAUTH_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
