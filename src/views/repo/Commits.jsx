import React from 'react'
import Common from './Common'

function Commit({ commit, repo }) {
    return (
        <div className="level">
            <div className="level-left">
                <div className="level-item">
                    <div>
                        <p>
                            <a href={`/repo/${repo.name}/commit/${commit.fullHash}`}>
                                <strong>{commit.message}</strong>
                            </a>
                        </p>
                        <p>
                            <small>
                                Commited {commit.date} by <b>{commit.author}</b>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
            <div className="level-right">
                <div className="buttons has-addons">
                    <button className="button is-hidden copy-button" data-hash={commit.fullHash}>
                        <span className="icon is-small">
                            <i className="far fa-clipboard"></i>
                        </span>
                    </button>
                    <a className="button is-family-monospace" href={`/repo/${repo.name}/commit/${commit.fullHash}`}>
                        <span className="has-text-link">{commit.hash}</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default function Commits({ commits, repo }) {
    return (
        <>
            <Common repo={repo} active="commits" />
            {commits.map((commit) => (
                <Commit key={commit.hash} commit={commit} repo={repo} />
            ))}
        </>
    )
}
