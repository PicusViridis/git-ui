import { Request, Response } from 'express'
import { Comment } from '../../models/Comment'

export type Req = Request<{ repo: string }, unknown, { content: string }, { issueId: string }>

export async function saveComment(req: Req, res: Response): Promise<void> {
  const { repo } = req.params
  const { issueId } = req.query
  const { content } = req.body
  const author = { id: req.user?.id }
  await Comment.getRepository().save({ content, author, issue: { id: Number(issueId) } })
  res.redirect(`/repo/${repo}/issues/edit/${issueId}`)
}
