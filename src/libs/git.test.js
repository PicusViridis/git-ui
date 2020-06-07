const { getContent, getDiffs, getSize, isBinary, isGitRepo, listBranches, listFiles, log } = require('./git')
const { exec } = require('child_process')
const mockdate = require('mockdate')
const mocks = require('../../mocks/git')

mockdate.set(1591530314000)

jest.mock('child_process')

describe('git', () => {
    beforeEach(jest.resetAllMocks)

    function mockExec(output) {
        exec.mockImplementationOnce((_, cb) => cb(null, output))
    }

    describe('log', () => {
        it('should return parsed logs', async () => {
            mockExec(mocks.logs)
            const logs = await log('repoPath', 'filePath', 'branch', 'params')
            expect(exec).toHaveBeenCalledWith(
                'git -C repoPath log params --format=%H::%h::%an::%at::%s branch -- filePath',
                expect.any(Function)
            )
            expect(logs).toEqual([
                {
                    author: 'Sara Morillon',
                    date: 'about 19 hours ago',
                    fullHash: '4cabd4f390e326a2ebd326fdd7fce6c56a73e084',
                    hash: '4cabd4f',
                    message: 'Fix writes on node_modules folder',
                    timestamp: 1591462554,
                },
                {
                    author: 'Sara Morillon',
                    date: 'about 19 hours ago',
                    fullHash: '8b647f3f3420a1c250675317557315ff5fdfa448',
                    hash: '8b647f3',
                    message: 'Add README.md',
                    timestamp: 1591460922,
                },
                {
                    author: 'Sara Morillon',
                    date: 'about 20 hours ago',
                    fullHash: '4d6868bb6029c431a91a1aa38d0bba896d61a927',
                    hash: '4d6868b',
                    message: 'Initial commit',
                    timestamp: 1591459571,
                },
            ])
        })
    })

    describe('listFiles', () => {
        it('should return files', async () => {
            mockExec(mocks.lsTree)
            const files = await listFiles('repoPath', 'filePath', 'branch')
            expect(exec).toHaveBeenCalledWith('git -C repoPath ls-tree branch filePath', expect.any(Function))
            expect(files).toEqual([
                { path: '.babelrc', type: 'file' },
                { path: '.env.template', type: 'file' },
                { path: '.eslintrc.json', type: 'file' },
                { path: '.gitignore', type: 'file' },
                { path: '.prettierrc.json', type: 'file' },
                { path: 'Dockerfile', type: 'file' },
                { path: 'README.md', type: 'file' },
                { path: 'db', type: 'folder' },
                { path: 'docker-compose.yml', type: 'file' },
                { path: 'package.json', type: 'file' },
                { path: 'src', type: 'folder' },
                { path: 'yarn.lock', type: 'file' },
            ])
        })
    })

    describe('listBranches', () => {
        it('should return branches', async () => {
            mockExec(mocks.branch)
            const branches = await listBranches('repoPath')
            expect(exec).toHaveBeenCalledWith('git -C repoPath branch', expect.any(Function))
            expect(branches).toEqual(['add-user-management', 'master'])
        })
    })

    describe('isGitRepo', () => {
        it('should return true if directory is a git repo', async () => {
            exec.mockImplementation((_, cb) => cb())
            const result = await isGitRepo('repoPath')
            expect(exec).toHaveBeenCalledWith('git -C repoPath rev-parse', expect.any(Function))
            expect(result).toBe(true)
        })

        it('should return false if directory is not a git repo', async () => {
            exec.mockImplementation((_, cb) => cb({ message: 'fatal: not a git repository' }))
            const result = await isGitRepo('repoPath')
            expect(result).toBe(false)
        })

        it('should rethrow other errors', async () => {
            exec.mockImplementation((_, cb) => cb(new Error('500')))
            await expect(isGitRepo('repoPath')).rejects.toThrow('500')
        })
    })

    describe('getContent', () => {
        it('should return content', async () => {
            mockExec('content')
            const content = await getContent('repoPath', 'filePath', 'branch')
            expect(exec).toHaveBeenCalledWith('git -C repoPath show branch:filePath', expect.any(Function))
            expect(content).toBe('content')
        })
    })

    describe('getSize', () => {
        it('should return content', async () => {
            mockExec('1')
            const content = await getSize('repoPath', 'filePath', 'branch')
            expect(exec).toHaveBeenCalledWith('git -C repoPath cat-file -s branch:filePath', expect.any(Function))
            expect(content).toBe('1')
        })
    })

    describe('isBinary', () => {
        it('should return true if file is binary', async () => {
            mockExec(mocks.diffTreeBinary)
            const result = await isBinary('repoPath', 'db/database.sqlite')
            expect(exec).toHaveBeenCalledWith(
                'git -C repoPath diff-tree -p 4b825dc642cb6eb9a060e54bf8d69288fbee4904 HEAD -- db/database.sqlite',
                expect.any(Function)
            )
            expect(result).toBe(true)
        })

        it('should return false if file is not binary', async () => {
            mockExec(mocks.diffTreeText)
            const result = await isBinary('repoPath', '.babelrc')
            expect(result).toBe(false)
        })
    })

    describe('getDiffs', () => {
        it('should return diff', async () => {
            mockExec('60f55f4b03e358017fc9005e54e44c25f27dbb62')
            mockExec('diff')
            const content = await getDiffs('repoPath', 'filePath', 'branch')
            expect(exec).toHaveBeenCalledWith('git -C repoPath log --pretty=%P -1 branch', expect.any(Function))
            expect(exec).toHaveBeenCalledWith(
                'git -C repoPath diff-tree -w -p 60f55f4b03e358017fc9005e54e44c25f27dbb62 branch -- filePath',
                expect.any(Function)
            )
            expect(content).toBe('diff')
        })
    })
})
