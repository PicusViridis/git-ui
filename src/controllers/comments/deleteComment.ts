import { Request, Response } from 'express'
import { Comment } from '../../models/Comment'

export type Req = Request<{ repo: string; id: string }, unknown, unknown, { issueId: string }>

export async function deleteComment(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  const { issueId } = req.query
  await Comment.getRepository().delete(id)
  res.redirect(`/repo/${repo}/issues/edit/${issueId}`)
}
