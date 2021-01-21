import { User as UserModel } from '../../src/models/User'

declare global {
  namespace Express {
    interface Request {
      user?: UserModel
    }
  }
}
