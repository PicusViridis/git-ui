const { convertBytes } = require('./convert')

describe('convertBytes', () => {
    it('should work with string argument', () => {
        expect(convertBytes('1')).toBe('1 Bytes')
    })

    it('should return value in Bytes', () => {
        expect(convertBytes(1)).toBe('1 Bytes')
    })

    it('should render value in KB', () => {
        expect(convertBytes(2 * 1000)).toBe('1.95 KB')
    })

    it('should render value in MB', () => {
        expect(convertBytes(3 * 1000 * 1000)).toBe('2.86 MB')
    })

    it('should render value in GB', () => {
        expect(convertBytes(4 * 1000 * 1000 * 1000)).toBe('3.73 GB')
    })

    it('should render value in TB', () => {
        expect(convertBytes(5 * 1000 * 1000 * 1000 * 1000)).toBe('4.55 TB')
    })
})
