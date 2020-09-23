import axios from 'axios'

// Get token from localstorage
const token = localStorage.getItem('auth._token.local')

let axiosInstance

if (token) {
  // Create base object
  axiosInstance = axios.create({
    baseURL: `${process.env.baseUrl}/api`,
    headers: {
      Authorization: token
    }
  })
} else {
  // Create base object
  axiosInstance = axios.create({
    baseURL: `${process.env.baseUrl}/api`
  })
}

export default () => {
  return axiosInstance
}
