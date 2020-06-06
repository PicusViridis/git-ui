import React from 'react'

export default function Diff({ diff }) {
    return <div dangerouslySetInnerHTML={{ __html: diff }} />
}
