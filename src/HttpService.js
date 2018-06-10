export const get = url => fetch(url).then(response => response.json());
export const post = (url, body) => fetch(url,
  {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
  },
}).then(response => response.json());
