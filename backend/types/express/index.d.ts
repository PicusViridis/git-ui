import { ISession } from '../../../models/Session'

declare global {
  namespace Express {
    interface User extends ISession {}
  }
}
