import axios from 'axios'
import config from '../config'

export function createHttpClient () {
  return new Http(config.http)
}

export class Http {
  constructor (config) {
    this._config = config
    this._instance = axios.create(config)
  }

  /**
   * Performs http request using axios.
   *
   * @param {string} method
   * @param {string} target
   * @param {object} data
   * @param {object} headers
   * @param {string} responseType
   * @returns {Promise<Response>}
   */
  async request (method, target, data, headers) {
    const methods = [ 'delete', 'get', 'post', 'put' ]

    method = method.toLowerCase()
    if (!methods.includes(method)) {
      throw new Error(
        'Invalid [method] name'
      )
    }

    const response = this._instance.request({
      method: method,
      url: target,
      headers: headers,
      ...Http._composePayload(data, method)
    }).then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })

    return response
  }

  /**
   * Constructing payload based on axios requirements.
   *
   * @param {object} data
   * @param {string} method
   * @returns {object}
   * @private
   */
  static _composePayload (data, method) {
    return method === 'get' ? { params: data } : { data: data }
  }

}
