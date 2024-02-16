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

export type DataResponse = {
  user: User
  data: DataPoint[]
  raffles: number
}