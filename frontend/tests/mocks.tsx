import { render } from '@testing-library/react'
import { Renderer, renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'
import React, { PropsWithChildren } from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { IApp } from '../../models/App'
import { ICommit } from '../../models/Commit'
import { FileType, IFile, IFileMeta } from '../../models/File'
import { IRepository } from '../../models/Repo'
import { IUser } from '../../models/User'

export function mock(fn: unknown): jest.Mock {
  return fn as jest.Mock
}

export async function flushPromises() {
  return act(async () => new Promise((resolve) => setTimeout(resolve, 0)))
}

export async function renderAsync(...args: Parameters<typeof render>): Promise<ReturnType<typeof render>> {
  const result = render(...args)
  await flushPromises()
  return result
}

export async function renderHookAsync<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
): Promise<RenderHookResult<TProps, TResult, Renderer<TProps>>> {
  const result = renderHook<TProps, TResult>(callback, options)
  await flushPromises()
  return result
}

export function routerWrapper({ children }: PropsWithChildren<unknown>) {
  return <MemoryRouter>{children}</MemoryRouter>
}

const { location } = window

export function mockLocation(fns: Partial<Location>): void {
  Object.defineProperty(window, 'location', { value: { ...location, ...fns }, writable: false })
}

export function restoreLocation(): void {
  Object.defineProperty(window, 'location', { value: location, writable: false })
}

export const mockUser1: IUser = {
  username: 'user1',
  createdAt: '2018-01-01 00:00:00',
}

export const mockUser2: IUser = {
  username: 'user2',
  createdAt: '2019-01-01 00:00:00',
}

export const mockRepo1: IRepository = {
  name: 'repo1',
  updatedAt: '2019-01-01 00:00:00',
}

export const mockRepo2: IRepository = {
  name: 'repo2',
  updatedAt: '2020-01-01 00:00:00',
}

export const mockFileMeta1: IFileMeta = {
  icon: 'icon1',
  name: 'name1',
  path: 'path1',
  type: FileType.FILE,
  lastCommit: {
    date: '2019-01-01 00:00:00',
    message: 'message1',
  },
}

export const mockFileMeta2: IFileMeta = {
  icon: 'icon2',
  name: 'name2',
  path: 'path2',
  type: FileType.FOLDER,
  lastCommit: {
    date: '2020-01-01 00:00:00',
    message: 'message2',
  },
}

export const mockFile1: IFile = {
  content: 'content',
  size: 1025486,
}

export const mockFile2: IFile = {
  content: '',
  size: 1025486,
}

export const mockCommit1: ICommit = {
  hash: 'hash1',
  author: 'author1',
  date: '2019-01-01 00:00:00',
  message: 'message1',
  parent: 'parent1',
}

export const mockCommit2: ICommit = {
  hash: 'hash2',
  author: 'author2',
  date: '2020-01-01 00:00:00',
  message: 'message2',
  parent: 'parent2',
}

export const mockApp: IApp = {
  name: 'name',
  version: 'version',
  author: { name: 'author', url: 'url' },
  repository: { url: 'repository' },
}

export const mockBreadcrumb1: BreadcrumbProps = {
  text: 'breadcrumb1',
  href: 'href1',
  current: false,
}

export const mockBreadcrumb2: BreadcrumbProps = {
  text: 'breadcrumb2',
  href: 'href2',
  current: true,
}
