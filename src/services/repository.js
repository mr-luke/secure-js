import config from '../config'
import { createHttpClient } from './http'

export function createRepositoryInstance () {
  return new Repository(config.repository)
}

export class Repository {
  constructor (config) {
    this._config = config
    this._http = createHttpClient()
  }

  /**
   * Sends user's application form.
   *
   * @param {object} data
   * @returns {Promise<Response>}
   */
  async sendApplication (data) {
    return this._http.request(
      this._config['method'],
      this._config['endpoint'],
      data.toPayload()
    )
  }
}
