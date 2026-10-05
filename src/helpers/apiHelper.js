// Saat development: panggil API Delcom langsung.
// Saat build produksi: panggil lewat domain sendiri (/api/v1) yang diteruskan Vercel (lihat vercel.json),
// supaya Chrome tidak menandai header Authorization sebagai "deprecated" (menurunkan skor Best Practices).
const UPSTREAM_URL = import.meta.env.VITE_API_URL || 'https://open-api.delcom.org/api/v1';
const BASE_URL = import.meta.env.PROD ? '/api/v1' : UPSTREAM_URL;

export const getAuthToken = () => {
  return localStorage.getItem('token') || '';
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Jika body bukan FormData, pasang header JSON
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada permintaan');
  }

  return data;
};

export const get = async (endpoint) => {
  return await fetchWithAuth(endpoint, { method: 'GET' });
};

export const post = async (endpoint, body) => {
  const isFormData = body instanceof FormData;
  return await fetchWithAuth(endpoint, {
    method: 'POST',
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const put = async (endpoint, body) => {
  const isFormData = body instanceof FormData;
  return await fetchWithAuth(endpoint, {
    method: 'PUT',
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const del = async (endpoint) => {
  return await fetchWithAuth(endpoint, { method: 'DELETE' });
};

const apiHelper = {
  fetchWithAuth,
  get,
  post,
  put,
  delete: del,
};

export default apiHelper;