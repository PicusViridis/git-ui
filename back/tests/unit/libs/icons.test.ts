import { FileType } from '../../../../models/File'
import { getIcon } from '../../../src/libs/icons'

describe('getIcon', () => {
  it('should return default folder icon if name has no extension', () => {
    expect(getIcon(FileType.FOLDER, 'name')).toBe('default_folder.svg')
  })

  it('should return icon according to extension', () => {
    expect(getIcon(FileType.FILE, 'name.js')).toBe('file_type_js.svg')
  })

  it('should return default file icon when no extension', () => {
    expect(getIcon(FileType.FILE, 'name')).toBe('default_file.svg')
  })

  it('should return default file icon when extension is not supported', () => {
    expect(getIcon(FileType.FILE, 'name.toto')).toBe('default_file.svg')
  })
})
