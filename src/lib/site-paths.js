export const BASE_URL = import.meta.env.BASE_URL ?? '/'
const normalizedBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL

export function stripBasePath(path) {
  if (BASE_URL === '/' || path === '/') return path
  if (path === normalizedBase || path === `${normalizedBase}/`) return '/'
  if (path.startsWith(`${normalizedBase}/`)) return path.slice(normalizedBase.length)
  return path
}

export function toBrowserPath(path) {
  if (!path.startsWith('/')) path = `/${path}`
  if (BASE_URL === '/') return path
  if (path === '/') return `${normalizedBase}/`
  return `${normalizedBase}${path}`
}

export function withBase(path) {
  if (typeof path !== 'string') return path
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) return path
  if (path.startsWith('/')) path = path.slice(1)
  if (BASE_URL === '/') return `/${path}`
  return `${normalizedBase}/${path}`
}
