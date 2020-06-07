const { mockContext } = require('../../mocks/context')
const { downloadFile, getCommit, getCommits, getFile, getFiles, getCommonInfo } = require('./repo')
const repositories = require('../libs/repositories')

jest.mock('../libs/repositories')

describe('repo', () => {
    beforeEach(jest.resetAllMocks)

    describe('getCommonInfo', () => {
        it('should return information from context', () => {
            const ctx = mockContext({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
            const info = getCommonInfo(ctx)
            expect(info).toEqual({ repo: 'repo', branch: 'branch', path: 'path' })
        })

        it('should return default information from context', () => {
            const ctx = mockContext({ params: { repo: 'repo' } })
            const info = getCommonInfo(ctx)
            expect(info).toEqual({ repo: 'repo', branch: 'master', path: '.' })
        })
    })

    describe('getFiles', () => {
        it('should render view with files', async () => {
            repositories.getFiles.mockResolvedValue([{ name: 'file' }])
            const ctx = mockContext({ params: { repo: 'repo' } })
            await getFiles(ctx)
            expect(repositories.getFiles).toHaveBeenCalledWith('repo', '.', 'master')
            expect(ctx.render).toHaveBeenCalledWith('repo/Files', { files: [{ name: 'file' }] })
        })
    })

    describe('getFile', () => {
        it('should render view with file content and size', async () => {
            repositories.getContent.mockResolvedValue('File content')
            repositories.getSize.mockResolvedValue('1 Byte')
            const ctx = mockContext({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
            await getFile(ctx)
            expect(repositories.getContent).toHaveBeenCalledWith('repo', 'path', 'branch')
            expect(repositories.getSize).toHaveBeenCalledWith('repo', 'path', 'branch')
            expect(ctx.render).toHaveBeenCalledWith('repo/File', { size: '1 Byte', content: 'File content' })
        })
    })

    describe('downloadFile', () => {
        it('should download file', async () => {
            repositories.getStream.mockResolvedValue('mock-stream')
            const ctx = mockContext({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path/name.ext' } })
            await downloadFile(ctx)
            expect(ctx.set).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename=name.ext')
            expect(ctx.body).toBe('mock-stream')
        })
    })

    describe('getCommits', () => {
        it('should render view with commits', async () => {
            repositories.getCommits.mockResolvedValue([{ hash: 'hash' }])
            const ctx = mockContext({ params: { repo: 'repo', branch: 'branch' }, query: { page: 2 } })
            await getCommits(ctx)
            expect(repositories.getCommits).toHaveBeenCalledWith('repo', 'branch', 2)
            expect(ctx.render).toHaveBeenCalledWith('repo/Commits', { commits: [{ hash: 'hash' }] })
        })

        it('should render view with commits and default page', async () => {
            repositories.getCommits.mockResolvedValue([{ hash: 'hash' }])
            const ctx = mockContext({ params: { repo: 'repo', branch: 'branch' } })
            await getCommits(ctx)
            expect(repositories.getCommits).toHaveBeenCalledWith('repo', 'branch', 1)
            expect(ctx.render).toHaveBeenCalledWith('repo/Commits', { commits: [{ hash: 'hash' }] })
        })
    })

    describe('getCommit', () => {
        it('should render view with repositories', async () => {
            repositories.getDiffs.mockResolvedValue('mock-diff')
            const ctx = mockContext({ params: { repo: 'repo', hash: 'hash' }, query: { path: 'path' } })
            await getCommit(ctx)
            expect(repositories.getDiffs).toHaveBeenCalledWith('repo', 'path', 'hash')
            expect(ctx.render).toHaveBeenCalledWith('repo/Diff', { diff: 'mock-diff' })
        })
    })
})
