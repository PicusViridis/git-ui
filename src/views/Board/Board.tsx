import React from 'react'
import { Issue } from '../../models/Issue'

interface IBoardProps {
  issues: Issue[]
  repo: string
}

export default function Board({ issues, repo }: IBoardProps): JSX.Element {
  return <>Coucou</>
}
