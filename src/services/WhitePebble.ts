import axios from 'axios';
import {DataResponse} from "@/services/types";

axios.defaults.baseURL = 'http://208.73.204.74'

export async function getData() {
  return axios.get<DataResponse>('/datadjfddjdjdjdjdjdjdjdjdjdjdjdjdhjdhdjhdjhdjdhudhddh')
}