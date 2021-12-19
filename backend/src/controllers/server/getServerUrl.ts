import { Request, Response } from 'express'
import { config } from '../../config'
import { start } from '../../libs/logger'

export function getServerUrl(req: Request, res: Response): void {
  const { success, failure } = start('get_server_url')
  try {
    res.send(config.serverUrl)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
