import { IconDownload } from '@tabler/icons'
import byteSize from 'pretty-bytes'
import React from 'react'
import { IFile } from '../../../../../models/File'
import { useRepoParams } from '../../../hooks/useParams'
import { makeUrl } from '../../../utils/utils'

export interface IFileProps {
  file: IFile
}

export function File({ file }: IFileProps): JSX.Element {
  const { repo, branch, path } = useRepoParams()

  return (
    <>
      <article className="flex justify-between items-center">
        <h5 className="m0">{byteSize(file.size, { binary: true })}</h5>
        <button onClick={() => window.location.assign(`/api${makeUrl(repo, branch, 'download', path)}`)}>
          <IconDownload /> Download file
        </button>
      </article>
      <pre>
        <code>{file.content || 'Cannot preview binary file'}</code>
      </pre>
    </>
  )
}
