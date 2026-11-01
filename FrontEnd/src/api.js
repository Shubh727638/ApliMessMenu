import { API_BASE } from './config';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const fetchMesses = (params = {}, signal) => {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString();
  return request(`/messes${qs ? `?${qs}` : ''}`, { signal });
};

export const fetchMess = (id, signal) => request(`/messes/${encodeURIComponent(id)}`, { signal });

export const sendContact = (body) =>
  request('/contact', { method: 'POST', body: JSON.stringify(body) });
