import React from 'react'
import { Download } from 'react-feather'
import { CardDeck } from 'reactstrap'
import { Attachment } from '../../models/Attachment'
import { AttachmentCard } from './Attachment'

interface IDownloadProps {
  repo: string
  issueId: number
}

function DownloadAll({ repo, issueId }: IDownloadProps) {
  return (
    <a href={`/repo/${repo}/attachments/download?issueId=${issueId}`}>
      <small style={{ fontSize: '1rem' }} className="float-right">
        <Download size={16} className="mb-1" /> Download all
      </small>
    </a>
  )
}

export interface IAttachmentsProps {
  repo: string
  issueId: number
  attachments?: Attachment[]
}

export function Attachments({ repo, issueId, attachments }: IAttachmentsProps): JSX.Element | null {
  if (!attachments?.length) {
    return null
  }

  return (
    <div>
      <h3>
        Attachments <DownloadAll repo={repo} issueId={issueId} />
      </h3>
      <CardDeck>
        {attachments.map((attachment) => (
          <AttachmentCard key={attachment.id} attachment={attachment} repo={repo} issueId={issueId} />
        ))}
      </CardDeck>
    </div>
  )
}
