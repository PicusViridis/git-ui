export function makeUrl(repo: string, branch: string, page: string, path?: string) {
  const query = path ? `?path=${path}` : ''
  return `/repo/${repo}/${branch}/${page}${query}`
}
