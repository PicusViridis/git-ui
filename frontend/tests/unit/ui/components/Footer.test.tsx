import { screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import { getApp } from '../../../../src/services/app'
import { Footer } from '../../../../src/ui/components/Footer'
import { mock, mockApp, renderAsync } from '../../../mocks'

jest.mock('../../../../src/services/app')

mockdate.set('2019-02-01T00:00:00.000Z')

describe('Footer', () => {
  it('should render nothing if no app information', async () => {
    mock(getApp).mockResolvedValue(undefined)
    const { container } = await renderAsync(<Footer />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render app name', async () => {
    mock(getApp).mockResolvedValue(mockApp)
    await renderAsync(<Footer />)
    expect(screen.getByText('name')).toBeInTheDocument()
  })

  it('should render app version, author name and current year', async () => {
    mock(getApp).mockResolvedValue(mockApp)
    await renderAsync(<Footer />)
    expect(screen.getByText('v1.0.0 © author 2019')).toBeInTheDocument()
  })

  it('should render repository url', async () => {
    mock(getApp).mockResolvedValue(mockApp)
    await renderAsync(<Footer />)
    expect(screen.getByText('repository')).toHaveAttribute('href', 'repository')
  })

  it('should render website url', async () => {
    mock(getApp).mockResolvedValue(mockApp)
    await renderAsync(<Footer />)
    expect(screen.getByText('url')).toHaveAttribute('href', 'url')
  })
})
