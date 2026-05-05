const BASE_URL = import.meta.env.BASE_URL || '/';

function isExternalAsset(path) {
  return /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('#');
}

export function assetPath(path = '') {
  if (!path) return BASE_URL;
  if (isExternalAsset(path)) return path;

  const normalizedBase = BASE_URL === './' ? './' : BASE_URL;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${normalizedBase}${normalizedPath}`;
}

export function routerBasename() {
  if (BASE_URL === '/' || BASE_URL === './') return '/';

  return BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
}
