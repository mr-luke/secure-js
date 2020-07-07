import { Http } from './http'

/**
 * @TODO
 */
export class Repository {
  constructor (config) {
    this._config = config.repository
    this._http = new Http(config.http)
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
      data
    )
  }
}
