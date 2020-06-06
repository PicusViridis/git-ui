import React from 'react'

function Repository({ repo }) {
    return (
        <>
            <hr />
            <div>
                <a href={`/repo/${repo.name}/files`}>
                    <strong>{repo.name}</strong>
                </a>
                <br />
                <small>
                    Updated <span>{repo.lastCommit.date}</span>
                </small>
            </div>
        </>
    )
}

export default function Home({ repositories }) {
    return repositories.map((repo) => <Repository key={repo.name} repo={repo} />)
}
