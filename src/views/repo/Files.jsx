import React from 'react'
import Breadcrumb from './Breadcrumb'
import Common from './Common'

function File({ file, repo }) {
    const href = file.type === 'folder' ? 'files' : 'file'
    return (
        <tr>
            <td>
                <span className="icon">
                    <img src={`/icons/${file.icon}`} width="16" height="16" />
                </span>
                <a href={`/repo/${repo.name}/${href}/${repo.branch}?path=${file.path}`}>{file.name}</a>
            </td>
            <td>{file.lastCommit.message}</td>
            <td>{file.lastCommit.date}</td>
        </tr>
    )
}

export default function Files({ files, repo }) {
    return (
        <>
            <Common repo={repo} active="files" />
            <Breadcrumb repo={repo} />
            <table className="table is-fullwidth is-hoverable">
                {files.map((file) => (
                    <File key={file.path} file={file} repo={repo} />
                ))}
            </table>
        </>
    )
}
