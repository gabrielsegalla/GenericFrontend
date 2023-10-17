import axios from 'axios'
import { getAuthToken } from '../hook/getAuthToken';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Host': '*',
    'Access-Control-Allow-Credentials': "true",
    'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
    'Access-Control-Allow-Headers':'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  },
})


export const apiAuthenticated = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Host': '*',
    'Access-Control-Allow-Credentials': "true",
    'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
    'Access-Control-Allow-Headers':'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    'Authorization': `Bearer ${getAuthToken()}` 
  },
})



api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';