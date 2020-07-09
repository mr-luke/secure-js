import axios, { AxiosInstance } from 'axios'

import { Headers, HttpConfig, Payload } from '../contracts/services'
import { mainConfig } from '../config'

export class Http {
  private _config: HttpConfig
  private _instance: AxiosInstance

  constructor (config: HttpConfig) {
    this._config = config
    this._instance = axios.create(
      this._config
    )
  }

  public static createInstnce (): Http {
    return new Http(
      mainConfig.http
    )
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
  public async request (
    method: string,
    target: string,
    data: Payload,
    headers: Headers = {}
  ): Promise<any> {
    const methods = [ 'delete', 'get', 'post', 'put' ]

    method = method.toLowerCase()
    if (!methods.includes(method)) {
      throw new Error(
        'Invalid [method] name'
      )
    }

    return this._instance.request({
      method: method as any,
      url: target,
      headers: headers,
      ...Http.composePayload(data, method)
    }).catch((error: any) => {
      return error.response
    })
  }

  /**
   * Constructing payload based on axios requirements.
   *
   * @param {object} data
   * @param {string} method
   * @returns {object}
   * @private
   */
  private static composePayload (data: Payload, method: string): Payload {
    return method === 'get' ? { params: data } : { data: data }
  }
}
