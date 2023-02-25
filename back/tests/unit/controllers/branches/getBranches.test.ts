import { getMockRes } from '@jest-mock/express'
import { getBranches, Req } from '../../../../src/controllers/branches/getBranches'
import { repositoryService } from '../../../../src/libs/repositories'
import { mock, mockReq } from '../../../mocks'

jest.mock('../../../../src/libs/repositories')

describe('getBranches', () => {
  it('should list branches', async () => {
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getBranches(req, res)
    expect(repositoryService.getBranches).toHaveBeenCalledWith('repo')
  })

  it('should return branches', async () => {
    mock(repositoryService.getBranches).mockResolvedValue('branches')
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getBranches(req, res)
    expect(res.json).toHaveBeenCalledWith('branches')
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getBranches).mockRejectedValue(new Error())
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await getBranches(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
