import { getMockRes } from '@jest-mock/express'
import { getBranches } from '../../../src/controllers/branches'
import { repositoryService } from '../../../src/libs/repositories'
import { getMockReq } from '../../mocks'

jest.mock('../../../src/libs/repositories')

describe('getBranches', () => {
  it('should list branches', async () => {
    const req = getMockReq({ params: { repo: 'repo' } })
    const { res } = getMockRes()
    await getBranches(req, res)
    expect(repositoryService.getBranches).toHaveBeenCalledWith('repo')
  })

  it('should return branches', async () => {
    jest.mocked(repositoryService.getBranches).mockResolvedValue('branches' as never)
    const req = getMockReq({ params: { repo: 'repo' } })
    const { res } = getMockRes()
    await getBranches(req, res)
    expect(res.json).toHaveBeenCalledWith('branches')
  })

  it('should return 500 status when failure', async () => {
    jest.mocked(repositoryService.getBranches).mockRejectedValue(new Error())
    const req = getMockReq({ params: { repo: 'repo' } })
    const { res } = getMockRes()
    await getBranches(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
