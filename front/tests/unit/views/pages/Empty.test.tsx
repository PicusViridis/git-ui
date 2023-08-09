import { render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getServerUrl } from '../../../../src/services/server'
import { Empty } from '../../../../src/views/pages/Empty'
import { wait } from '../../../mocks'

vi.mock('../../../../src/services/server')

describe('Empty', () => {
  beforeEach(() => {
    vi.mocked(getServerUrl).mockResolvedValue('serverUrl')
  })

  it('should render clone url', async () => {
    render(<Empty repo="repo" />)
    await wait()
    expect(screen.getByText('git clone serverUrl/repo')).toBeInTheDocument()
  })

  it('should render remote url', async () => {
    render(<Empty repo="repo" />)
    await wait()
    expect(screen.queryAllByText('git remote add origin serverUrl/repo')).toHaveLength(2)
  })
})
