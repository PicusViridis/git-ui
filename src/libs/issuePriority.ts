import { Between, MoreThan } from 'typeorm'
import { Issue } from '../models/Issue'

export async function updatePriority(id: number, priority: number): Promise<void> {
  const issue = await Issue.repository.findOne(id, { relations: ['release'] })
  if (issue) {
    const translate = issue.priority < priority ? 'priority - 1' : 'priority + 1'
    const minPriority = Math.min(issue.priority, priority)
    const maxPriority = Math.max(issue.priority, priority)
    await Issue.repository.update(
      { release: issue.release, priority: Between(minPriority, maxPriority) },
      { priority: () => translate }
    )
    await Issue.repository.update(id, { priority })
  }
}

export async function updateRelease(id: number, releaseId: number): Promise<void> {
  const issue = await Issue.repository.findOne(id, { relations: ['release'] })
  if (issue) {
    const result = await Issue.repository.findOne({
      where: { release: { id: releaseId } },
      order: { priority: 'DESC' },
    })
    const priority = result ? result.priority + 1 : 0
    await Issue.repository.update(
      { release: { id: issue.release.id }, priority: MoreThan(issue.priority) },
      { priority: () => 'priority - 1' }
    )
    await Issue.repository.update(id, { priority, ...(releaseId && { release: { id: releaseId } }) })
  }
}
