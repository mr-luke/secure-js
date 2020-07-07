/**
 * @TODO
 */
export class User {
  constructor () {
    this._about = null
    this._email = null
    this._firstName = null
    this._lastName = null
  }

  get about () {
    return this._about
  }
  set about (value) {
    this._about = value
  }

  get email () {
    return this._email
  }
  set email (value) {
    this._email = value
  }

  get firstName () {
    return this._firstName
  }
  set firstName (value) {
    this._firstName = value
  }

  get lastName () {
    return this._lastName
  }
  set lastName (value) {
    this._lastName = value
  }

  toPayload () {
    return {
      about: this._about,
      email: this._email,
      firstName: this._firstName,
      lastName: this._lastName
    }
  }
}
