import React from 'react'
import Breadcrumb from './Breadcrumb'
import Common from './Common'

export default function File({ size, content, repo }) {
    return (
        <>
            <Common repo={repo} active="files" />
            <Breadcrumb repo={repo} />
            <div className="panel">
                <div className="panel-block has-background-light" style={{ justifyContent: 'space-between' }}>
                    <span className="is-family-monospace">{size}</span>
                    <a className="button" href={`/repo/${repo.name}/download/${repo.branch}?path=${repo.path}`}>
                        <span className="icon is-small">
                            <i className="fas fa-download"></i>
                        </span>
                        <span>Download file</span>
                    </a>
                </div>
                {content && <pre className="panel-block hljs" dangerouslySetInnerHTML={{ __html: content }} />}
                {!content && (
                    <div className="panel-block notification">
                        <p>Cannot preview binary file.</p>
                    </div>
                )}
            </div>
        </>
    )
}
