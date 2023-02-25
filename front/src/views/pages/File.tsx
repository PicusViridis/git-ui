import { IconDownload } from '@tabler/icons'
import byteSize from 'pretty-bytes'
import React from 'react'
import { useRepoParams } from '../../hooks/useParams'
import { IFile } from '../../models/File'
import { makeUrl } from '../../utils/utils'

export interface IFileProps {
  file: IFile
}

export function File({ file }: IFileProps): JSX.Element {
  const { repo, branch, path } = useRepoParams()

  return (
    <>
      <article className="p0 mb0">
        <div className="flex justify-between items-center py1 px2">
          <h5 className="m0">{byteSize(file.size, { binary: true })}</h5>
          <button onClick={() => window.location.assign(`/api${makeUrl(repo, branch, 'download', path)}`)}>
            <IconDownload /> Download file
          </button>
        </div>
        <pre className="m0">
          <code className="block p2">{file.content || 'Cannot preview binary file'}</code>
        </pre>
      </article>
    </>
  )
}
