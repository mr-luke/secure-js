import { Http } from './http'
import { mainConfig } from '../config'
import { RepositoryConfig } from '../contracts/services'
import { User } from '../models/user'

export class Repository {
  private _config: any
  private _http: Http

  constructor (config: RepositoryConfig) {
    this._config = config
    this._http = Http.createInstnce()
  }

  public static createInstnce (): Repository {
    return new Repository(
      mainConfig.repository
    )
  }

  /**
   * Sends user's application form.
   *
   * @param {object} data
   * @returns {Promise<Response>}
   */
  public async sendApplication (data: User): Promise<any> {
    return this._http.request(
      this._config['method'],
      this._config['endpoint'],
      data.toPayload()
    )
  }
}
