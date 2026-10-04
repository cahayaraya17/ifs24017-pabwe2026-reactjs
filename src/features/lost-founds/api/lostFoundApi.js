import { fetchWithAuth } from '../../../helpers/apiHelper';

export const getLostFoundsApi = async (queryParams = {}) => {
  return await fetchWithAuth('/lost-founds', {}, queryParams);
};

export const getDetailLostFoundApi = async (id) => {
  return await fetchWithAuth(`/lost-founds/${id}`);
};

export const addLostFoundApi = async (data) => {
  return await fetchWithAuth('/lost-founds', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateLostFoundApi = async (id, data) => {
  return await fetchWithAuth(`/lost-founds/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteLostFoundApi = async (id) => {
  return await fetchWithAuth(`/lost-founds/${id}`, {
    method: 'DELETE',
  });
};

export const uploadCoverLostFoundApi = async (id, formData) => {
  return await fetchWithAuth(`/lost-founds/${id}/cover`, {
    method: 'POST',
    body: formData,
  });
};

export const getDailyStatsApi = async () => {
  return await fetchWithAuth('/lost-founds/stats/daily');
};

export const getMonthlyStatsApi = async () => {
  return await fetchWithAuth('/lost-founds/stats/monthly');
};