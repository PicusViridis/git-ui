import { postRepo, Req } from '@/controllers/repos/postRepo'
import { RepositoryService } from '@/libs/repositories'
import { getMockReq, getMockRes } from '@jest-mock/express'

jest.mock('@/libs/repositories')

describe('postRepo', () => {
  const body = { name: 'repo' }
  const req = getMockReq<Req>({ body })
  const { res, clearMockRes } = getMockRes()

  beforeEach(() => {
    clearMockRes()
  })

  it('should create repository', async () => {
    await postRepo(req, res)
    expect(RepositoryService.createRepository).toHaveBeenCalledWith('repo.git')
  })

  it('should redirect to home', async () => {
    await postRepo(req, res)
    expect(res.redirect).toHaveBeenCalledWith('/')
  })
})
