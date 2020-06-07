const { parse, html } = require('diff2html')
const git = require('./git')
const {
    getBreadcrumb,
    getCommits,
    getContent,
    getDiffs,
    getSize,
    getStream,
    getFiles,
    listBranches,
    listRepositories,
} = require('./repositories')

jest.mock('fs-extra', () => ({
    readdir: () => ['file1', 'file2'],
    stat: () => ({ isDirectory: () => true }),
}))
jest.mock('diff2html')
jest.mock('./git')

describe('repositories', () => {
    beforeEach(jest.resetAllMocks)

    describe('listRepositories', () => {
        it('should return repositories sorted by last commit date', async () => {
            git.isGitRepo.mockResolvedValue(true)
            git.log.mockResolvedValueOnce([{ timestamp: 0 }])
            git.log.mockResolvedValueOnce([{ timestamp: 1 }])
            const repositories = await listRepositories()
            expect(repositories).toEqual([
                { name: 'file2', lastCommit: { timestamp: 1 } },
                { name: 'file1', lastCommit: { timestamp: 0 } },
            ])
            expect(git.log).toHaveBeenCalledWith('repo-dir/file1', '.')
            expect(git.log).toHaveBeenCalledWith('repo-dir/file2', '.')
        })
    })

    describe('getFiles', () => {
        it('should return files ordered by type and name', async () => {
            git.listFiles.mockResolvedValue([
                { type: 'file', path: 'b' },
                { type: 'folder', path: 'B' },
                { type: 'file', path: 'a' },
                { type: 'folder', path: 'A' },
            ])
            git.log.mockResolvedValue([])
            const files = await getFiles('repoName', 'currentPath', 'branch')
            expect(files).toEqual([
                { type: 'folder', path: 'A', name: 'A', icon: 'default_folder.svg' },
                { type: 'folder', path: 'B', name: 'B', icon: 'default_folder.svg' },
                { type: 'file', path: 'a', name: 'a', icon: 'default_file.svg' },
                { type: 'file', path: 'b', name: 'b', icon: 'default_file.svg' },
            ])
        })
    })

    describe('listBranches', () => {
        it('should return branches without the current branch', async () => {
            git.listBranches.mockResolvedValue(['master', 'develop'])
            const branches = await listBranches('repoName', 'master')
            expect(git.listBranches).toHaveBeenCalledWith('repo-dir/repoName')
            expect(branches).toEqual(['develop'])
        })
    })

    describe('getContent', () => {
        it('should return false if file is binary', async () => {
            git.isBinary.mockResolvedValue(true)
            const content = await getContent('repoName', 'currentPath', 'branch')
            expect(content).toBe(false)
        })

        it('should return highlighted content if file is not binary', async () => {
            git.isBinary.mockResolvedValue(false)
            git.getContent.mockResolvedValue('const value = 5;')
            const content = await getContent('repoName', 'currentPath', 'branch')
            expect(git.getContent).toHaveBeenCalledWith('repo-dir/repoName', 'currentPath', 'branch')
            expect(content).toBe('<span class="hljs-keyword">const</span> value = <span class="hljs-number">5</span>;')
        })
    })

    describe('getSize', () => {
        it('should return file size', async () => {
            git.getSize.mockResolvedValue(3000)
            const size = await getSize('repoName', 'currentPath', 'branch')
            expect(git.getSize).toHaveBeenCalledWith('repo-dir/repoName', 'currentPath', 'branch')
            expect(size).toBe('2.93 KB')
        })
    })

    describe('getStream', () => {
        it('should return raw content', async () => {
            git.getContent.mockResolvedValue('file content')
            const stream = await getStream('repoName', 'currentPath', 'branch')
            expect(git.getContent).toHaveBeenCalledWith('repo-dir/repoName', 'currentPath', 'branch')
            expect(stream).toBe('file content')
        })
    })

    describe('getBreadcrumb', () => {
        it('should return breadcrumb with last part active', () => {
            const breadcrumb = getBreadcrumb('repoName', 'this/is/a/path')
            expect(breadcrumb).toEqual([
                { name: 'repoName', isActive: false },
                { name: 'this', path: 'this', isActive: false },
                { name: 'is', path: 'this/is', isActive: false },
                { name: 'a', path: 'this/is/a', isActive: false },
                { name: 'path', path: 'this/is/a/path', isActive: true },
            ])
        })

        it('should return only repo name if path is "."', () => {
            const breadcrumb = getBreadcrumb('repoName', '.')
            expect(breadcrumb).toEqual([{ name: 'repoName', isActive: true }])
        })
    })

    describe('getCommits', () => {
        it('should return commits by page', async () => {
            git.log.mockResolvedValue([{ timestamp: 1 }])
            const logs = await getCommits('repoName', 'branch', 4)
            expect(git.log).toHaveBeenCalledWith('repo-dir/repoName', '.', 'branch', '-20 --skip=60')
            expect(logs).toEqual([{ timestamp: 1 }])
        })
    })

    describe('getDiffs', () => {
        it('should return diff', async () => {
            parse.mockReturnValue('parsed diff')
            html.mockReturnValue('html diff')
            git.getDiffs.mockResolvedValue('raw diff')
            const diff = await getDiffs('repoName', 'currentPath', 'branch')
            expect(git.getDiffs).toHaveBeenCalledWith('repo-dir/repoName', 'currentPath', 'branch')
            expect(parse).toHaveBeenCalledWith('raw diff')
            expect(html).toHaveBeenCalledWith('parsed diff', { outputFormat: 'side-by-side', drawFileList: false })
            expect(diff).toBe('html diff')
        })
    })
})
