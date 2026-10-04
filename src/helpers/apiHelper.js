// Mengambil Base URL dari environment variable (.env) atau default API resmi Delcom
const BASE_URL = import.meta.env.VITE_API_URL || 'https://open-api.delcom.org/api/v1';

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
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const data = await response.json();
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