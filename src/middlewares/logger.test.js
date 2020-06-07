const { mockContext } = require('../../mocks/context')
const { mockInfo, mockLogger, mockError } = require('../../mocks/logger')
const { logger } = require('./logger')
const mockdate = require('mockdate')

mockdate.set(1591530314000)

jest.mock('winston', () => mockLogger())

describe('logger', () => {
    beforeEach(jest.resetAllMocks)

    it('should log if request succeeds', async () => {
        const ctx = mockContext({ method: 'GET', url: 'url', params: 'params', query: 'query', status: 200 })
        const next = jest.fn()
        await logger()(ctx, next)
        expect(next).toHaveBeenCalled()
        expect(mockInfo).toHaveBeenCalledWith('request_success', {
            duration: '0ms',
            method: 'GET',
            params: 'params',
            query: 'query',
            status: 200,
            url: 'url',
        })
    })

    it('should log if request fails', async () => {
        const ctx = mockContext({ method: 'GET', url: 'url', params: 'params', query: 'query', status: 200 })
        const next = jest.fn().mockRejectedValue(new Error('500'))
        await logger()(ctx, next)
        expect(next).toHaveBeenCalled()
        expect(mockError).toHaveBeenCalledWith('request_error', {
            method: 'GET',
            params: 'params',
            query: 'query',
            url: 'url',
            error: new Error('500'),
        })
    })
})
