import fetch from 'node-fetch';

export async function fetchHtml(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch HTML');
  return await response.text();
}
