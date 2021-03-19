import { addRepo } from '@/controllers/repos/addRepo'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('addRepo', () => {
  it('should render add repo page', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    addRepo(req, res)
    expect(res.render).toHaveBeenCalledWith('Repos/Repo', { title: 'Add repository' })
  })
})
