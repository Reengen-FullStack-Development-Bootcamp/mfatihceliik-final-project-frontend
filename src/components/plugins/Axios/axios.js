import axios from "axios"

// , {headers: {'Authorization' : `Bearer ${this.token}`}}

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})
instance.defaults.baseURL = 'http://localhost:3000/api/'
instance.defaults.headers.common['Authorization'] = localStorage.token
instance.interceptors.request.use((config) => {
  let token = localStorage.token
  config.headers['Authorization'] = 'Bearer ' + token
  return config
})

export default instance

