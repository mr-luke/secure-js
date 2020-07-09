import { MainAppConfig } from './contracts/app'

export const mainConfig: MainAppConfig = {
  http: {
    baseURL: 'http://localhost:8080',
    debug: false,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  repository: {
    endpoint: 'form',
    method: 'POST'
  }
}

export default mainConfig
