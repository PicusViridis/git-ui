import { Between, MoreThan } from 'typeorm'
import { Issue } from '../models/Issue'

export async function updatePriority(id: number, priority: number): Promise<void> {
  const issue = await Issue.getRepository().findOne(id, { relations: ['release'] })
  const translate = issue.priority < priority ? 'priority - 1' : 'priority + 1'
  const minPriority = Math.min(issue.priority, priority)
  const maxPriority = Math.max(issue.priority, priority)
  await Issue.getRepository().update(
    { release: issue.release, priority: Between(minPriority, maxPriority) },
    { priority: () => translate }
  )
  await Issue.getRepository().update(id, { priority })
}

export async function updateRelease(id: number, releaseId: number): Promise<void> {
  const issue = await Issue.getRepository().findOne(id, { relations: ['release'] })
  const result = await Issue.getRepository().findOne({
    where: { release: { id: releaseId } },
    order: { priority: 'DESC' },
  })
  const priority = result ? result.priority + 1 : 0
  await Issue.getRepository().update(
    { release: { id: issue.release.id }, priority: MoreThan(issue.priority) },
    { priority: () => 'priority - 1' }
  )
  await Issue.getRepository().update(id, { priority, ...(releaseId && { release: { id: releaseId } }) })
}
