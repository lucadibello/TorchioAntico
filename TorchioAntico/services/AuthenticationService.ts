// Import Api base functionalities
import Api from '~/plugins/api'

// Service type definition
export interface AuthenticationService {
  login(email: string, password: string): Promise<any>
  isAlive(jwtToken: string): Promise<any>
  setToken(token: string): void
  getToken(): string | null
}

// Service features
const authService: AuthenticationService = {
  login (email: string, password: string) {
    return Api().post('auth', { email, password })
  },
  isAlive (jwtToken: string) {
    return Api().post('auth/alive', { token: jwtToken })
  },
  setToken (token: string) {
    sessionStorage.setItem('token', token)
  },
  getToken () {
    return sessionStorage.getItem('token')
  }
}

// Export service features
export default authService
