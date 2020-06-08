import React from 'react'

function Branch({ branch, repo, active }) {
    const href = `/repo/${repo.name}/${active}/${branch}?path=${repo.path}`
    return (
        <a key={branch} href={href} className="dropdown-item">
            {branch}
        </a>
    )
}

function BranchName({ branch }) {
    return (
        <span>
            Branch : <strong>{branch}</strong>
        </span>
    )
}

export default function BranchSelect({ repo, active }) {
    if (repo.branches.length) {
        return (
            <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                    <button className="button">
                        <BranchName branch={repo.branch} />
                        <span className="icon is-small">
                            <i className="fas fa-angle-down"></i>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {repo.branches.map((branch) => (
                            <Branch key={branch} branch={branch} repo={repo} active={active} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button className="button is-static" disabled>
            <BranchName branch={repo.branch} />
        </button>
    )
}
