/* eslint-disable @typescript-eslint/no-explicit-any */
export const BACKEND_URL = (import.meta as any).env.VITE_BACKEND_URL
export const GOOGLE_OAUTH_CLIENT_ID = (import.meta as any).env.VITE_GOOGLE_OAUTH_CLIENT_ID

export const EVENT_TYPES = [
  'EVENT',
  'TASK',
  'MEETING',
  'FOCUS_TIME',
  'OUT_OF_OFFICE',
  'WORKING_LOCATION',
  'APPOINTMENT_SCHEDULE'
]
