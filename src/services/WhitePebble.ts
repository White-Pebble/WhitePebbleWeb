import axios from 'axios';
import {WebsiteResponse} from "@/services/types";

axios.defaults.baseURL = 'http://208.73.204.74:12832'

export async function getData() {
  return axios.get<WebsiteResponse>('/datadjfddjdjdjdjdjdjdjdjdjdjdjdjdhjdhdjhdjhdjdhudhddh')
}