import { User } from '../models/user'

export interface FormProperties {
  isFormDisabled: boolean
  message: string|null
  messageType: string
  user: User
}
