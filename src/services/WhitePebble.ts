import axios from 'axios';
import {AppMe, AppResponse, ClashMe, Point, Website} from "@/services/types";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.validateStatus = status => (status >= 200 && status < 420) || status === 500

// JWT interceptor! :D
axios.interceptors.request.use(async (config) => {
  if (localStorage.getItem('token'))
    config.headers['Authorization'] = `${localStorage.getItem('token')}`

  return config
}, (error) => {
  return Promise.reject(error)
})

// Error interceptor
axios.interceptors.response.use(async (response) => {
  // Check for errors!
  if (Object.keys(response.data).includes('success') && !response.data.success) {
    const errorData = response.data as AppResponse

    if (errorData.message !== 'Unauthorized')
      // @ts-ignore
      window.error(errorData.message, errorData.reason)
  }

  return response
}, function (error) {
  return Promise.reject(error)
})

export async function me() {
  return axios.get<AppResponse & {user: AppMe}>("/me")
}

export async function login(email: string, password: string) {
  return axios.post<AppResponse & {token: string}>("/login", {
    email: email,
    password: password
  })
}

export async function availableSites() {
  return axios.get<AppResponse & {available: Website[]}>('/stats/available')
}

export async function stats(website: Website) {
  return axios.get<AppResponse & {user: ClashMe, points: Point[]}>(`/stats/${website}`)
}