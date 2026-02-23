import { URL_API } from '@/utils/constants'
import axios from 'axios'

const api = axios.create({
  baseURL: URL_API,
})

export default api
