import React from 'react'

function BreadcrumbPart({ part, repo }) {
    let href = `/repo/${repo.name}/files/${repo.branch}`
    if (part.path) {
        href += `?${part.path}`
    }
    return (
        <li className={part.isActive ? 'is-active' : ''}>
            <a href={href}>{part.name}</a>
        </li>
    )
}

export default function Breadcrumb({ repo }) {
    return (
        <nav className="breadcrumb">
            <ul>
                {repo.breadcrumb.map((part) => (
                    <BreadcrumbPart key={part.name} part={part} repo={repo} />
                ))}
            </ul>
        </nav>
    )
}
