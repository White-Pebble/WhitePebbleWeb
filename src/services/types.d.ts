export type User = {
  email: string
  name: string
  balance: number
  tickets: number
}

export type DataPoint = {
  balance: number
  tickets: number
}

export type WebsiteResponse = ApiResponse & {
  user: User
  data: DataPoint[]
  raffles: number
}

export type ApiResponse = {
  success: boolean
  message?: string
}