import { UserPayload } from '../contracts/models'

export class User {
  private _about: string|null
  private _email: string|null
  private _firstName: string|null
  private _lastName: string|null

  constructor () {
    this._about = null
    this._email = null
    this._firstName = null
    this._lastName = null
  }

  get about (): string {
    return this._about || ''
  }
  set about (value: string) {
    this._about = value
  }

  get email (): string {
    return this._email || ''
  }
  set email (value: string) {
    this._email = value
  }

  get firstName (): string {
    return this._firstName || ''
  }
  set firstName (value: string) {
    this._firstName = value
  }

  get lastName (): string {
    return this._lastName || ''
  }
  set lastName (value: string) {
    this._lastName = value
  }

  toPayload (): UserPayload {
    return {
      about: this.about,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    }
  }
}
