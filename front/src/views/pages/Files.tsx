import { formatDistance, parseISO } from 'date-fns'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useRepoParams } from '../../hooks/useParams'
import { IFileMeta } from '../../models/File'
import { makeUrl } from '../../utils/utils'

interface IFilesProps {
  files: IFileMeta[]
}

export function Files({ files }: IFilesProps): JSX.Element {
  const { repo, branch } = useRepoParams()

  return (
    <table>
      <tbody>
        {files.map((file) => (
          <tr key={file.path}>
            <td>
              <NavLink to={makeUrl(repo, branch, 'tree', file.path)} className="flex items-center">
                <img src={`/icons/${file.icon}`} width="16" height="16" className="mr1" /> {file.name}
              </NavLink>
            </td>
            <td>{file.lastCommit.message}</td>
            <td>{formatDistance(parseISO(file.lastCommit.date), Date.now(), { addSuffix: true })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
