import axios from 'axios';
import {WebsiteResponse} from "@/services/types";

axios.defaults.baseURL = 'http://api.kade.bet'

export async function getData() {
  return axios.get<WebsiteResponse>('/datadjfddjdjdjdjdjdjdjdjdjdjdjdjdhjdhdjhdjhdjdhudhddh')
}
