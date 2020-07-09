export interface Headers {
  [key: string]: string
}

export interface HttpConfig {
  baseURL: string
  debug: boolean
  headers: object
}

export enum HttpCodes {
  BadRequest = 400,
  Conflict = 409,
  InternalError = 500,
  Success = 200,
  Validation = 422
}

export enum HttpMessages {
  Error = 'Upss.. sth went wrong.',
  Success = 'Done.',
  Validation = 'Invalid data given.'
}

export interface Payload {
  [key: string]: any
}

export interface RepositoryConfig {
  endpoint: string
  method: string
}
