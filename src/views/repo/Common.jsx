import React from 'react'
import BranchSelect from './BranchSelect'

export default function Common({ active, repo }) {
    return (
        <>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">{repo.name}</h1>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <BranchSelect repo={repo} active={active} />
                    </div>
                </div>
            </div>

            <div className="tabs">
                <ul>
                    <li className={active === 'files' ? 'is-active' : ''}>
                        <a href={`/repo/${repo.name}/files/${repo.branch}`}>Files</a>
                    </li>
                    <li className={active === 'commits' ? 'is-active' : ''}>
                        <a href={`/repo/${repo.name}/commits/${repo.branch}`}>Commits</a>
                    </li>
                </ul>
            </div>
        </>
    )
}
