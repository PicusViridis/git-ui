export const pages = ['tree', 'commits', 'branches'] as const

export type Page = (typeof pages)[number]
