import { fetchWithAuth } from '../../../helpers/apiHelper';

export const getUsersApi = async () => {
  return await fetchWithAuth('/users');
};

export const getProfileApi = async () => {
  return await fetchWithAuth('/users/me');
};

export const updateProfileApi = async (profileData) => {
  return await fetchWithAuth('/users/me', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

export const updateAvatarApi = async (formData) => {
  return await fetchWithAuth('/users/me/photo', {
    method: 'POST',
    body: formData,
  });
};

export const updatePasswordApi = async (passwordData) => {
  return await fetchWithAuth('/users/me/password', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  });
};