import { Request, Response } from 'express'
import { settings } from '../settings'

export function getServerUrl(req: Request, res: Response): void {
  const { success, failure } = req.logger.start('get_server_url')
  try {
    res.send(settings.serverUrl)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
