export function ApiError(response) {
  this.status = response.status;
  this.statusText = response.statusText;
  this.url = response.url;
}

export const isSSR = typeof window === 'undefined';

export async function fetcher(url: RequestInfo) {
  const headers = new Headers({ Accept: 'application/json' });
  const response = await fetch(url, { headers });

  if (!response.ok) throw new ApiError(response);
  return await response.json();
}
