const { getIcon } = require('./icons')

jest.mock('./icons.json', () => ({
    toto: 'tutu',
}))

describe('getIcon', () => {
    beforeEach(jest.resetAllMocks)

    it('should return "default_folder.svg" if type is "folder"', () => {
        expect(getIcon('folder', 'name')).toBe('default_folder.svg')
    })

    it('should return "default_file.svg" if ext is missing from json file', () => {
        expect(getIcon('file', 'name.ext')).toBe('default_file.svg')
    })

    it('should return icon from json file', () => {
        expect(getIcon('file', 'name.toto')).toBe('tutu')
    })
})
