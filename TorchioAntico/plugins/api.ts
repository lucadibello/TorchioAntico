import axios from 'axios'

// Create base object
const axiosInstance = axios.create({
  baseURL: `${process.env.baseUrl}/api`
})

export default () => {
  return axiosInstance
}