import { Button, Card, H5, Pre } from '@blueprintjs/core'
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
      <Card className="flex justify-between items-center">
        <H5 className="m0">{byteSize(file.size, { binary: true })}</H5>
        <Button
          minimal
          icon="download"
          onClick={() => window.location.assign(`/api${makeUrl(repo, branch, 'download', path)}`)}
        >
          Download file
        </Button>
      </Card>
      <Pre className="m0">
        <code>{file.content || 'Cannot preview binary file'}</code>
      </Pre>
    </>
  )
}
