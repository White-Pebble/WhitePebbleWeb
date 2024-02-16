import axios from 'axios';
import {DataResponse} from "@/services/types";

axios.defaults.baseURL = 'http://localhost'

export async function getData() {
  return axios.get<DataResponse>('/data')
}