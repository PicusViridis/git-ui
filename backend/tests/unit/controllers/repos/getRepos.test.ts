import { getMockReq, getMockRes } from '@jest-mock/express'
import { getRepos } from '../../../../src/controllers/repos/getRepos'
import { repositoryService } from '../../../../src/libs/repositories'
import { mock } from '../../../mocks'

jest.mock('../../../../src/libs/repositories')

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
