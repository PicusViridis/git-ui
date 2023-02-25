import { screen } from '@testing-library/react'
import React from 'react'
import { getServerUrl } from '../../../../src/services/server'
import { Empty } from '../../../../src/views/pages/Empty'
import { mock, renderAsync } from '../../../mocks'

jest.mock('../../../../src/services/server')

describe('Empty', () => {
  beforeEach(() => {
    mock(getServerUrl).mockResolvedValue('serverUrl')
  })

  it('should render clone url', async () => {
    await renderAsync(<Empty repo="repo" />)
    expect(screen.getByText('git clone serverUrl/repo')).toBeInTheDocument()
  })

  it('should render remote url', async () => {
    await renderAsync(<Empty repo="repo" />)
    expect(screen.queryAllByText('git remote add origin serverUrl/repo')).toHaveLength(2)
  })
})
