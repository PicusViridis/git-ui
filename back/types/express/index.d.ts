import { ISession } from '../../src/models/Session'

declare global {
  namespace Express {
    interface User extends ISession {}
  }
}
