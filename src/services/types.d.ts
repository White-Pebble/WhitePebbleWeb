export type Role = 'ADMIN' | 'MEMBER'

export type Website = 'clash' | 'rustclash'

export type Point = {
  balance: number
  id: number
  tickets: number
  created: number
  clash_user: ClashUser
}

export type ClashMe = {
  name: string
  balance: number
  tickets: number
  id: number
}

export type ClashUser = {
  website: 'CLASH' | 'RUSTCLASH'
}

export type AppMe = {
  id: number
  username: string
  email: string
  role: Role
}

export type AppResponse = {
  success: boolean
  message: string | null
  reason: string | null
}