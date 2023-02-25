import { getMockReq, getMockRes } from '@jest-mock/express'
import { getRepos, postRepo, Req } from '../../../src/controllers/repos'
import { repositoryService } from '../../../src/libs/repositories'
import { mock } from '../../mocks'

jest.mock('../../../src/libs/repositories')

describe('getRepos', () => {
  it('should get repos', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await getRepos(req, res)
    expect(repositoryService.getRepositories).toHaveBeenCalledWith()
  })

  it('should return repos', async () => {
    mock(repositoryService.getRepositories).mockResolvedValue('repositories')
    const req = getMockReq()
    const { res } = getMockRes()
    await getRepos(req, res)
    expect(res.json).toHaveBeenCalledWith('repositories')
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getRepositories).mockRejectedValue(new Error())
    const req = getMockReq()
    const { res } = getMockRes()
    await getRepos(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('postRepo', () => {
  it('should create repo', async () => {
    const req = getMockReq<Req>({ body: { name: 'name' } })
    const { res } = getMockRes()
    await postRepo(req, res)
    expect(repositoryService.createRepository).toHaveBeenCalledWith('name.git')
  })

  it('should return 201 status', async () => {
    mock(repositoryService.createRepository).mockResolvedValue('repositories')
    const req = getMockReq<Req>({ body: { name: 'name' } })
    const { res } = getMockRes()
    await postRepo(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.createRepository).mockRejectedValue(new Error())
    const req = getMockReq<Req>({ body: { name: 'name' } })
    const { res } = getMockRes()
    await postRepo(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
