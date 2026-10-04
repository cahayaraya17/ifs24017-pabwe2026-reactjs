import apiHelper from '../../../helpers/apiHelper';

export const postRegisterApi = async (data) => {
  return await apiHelper.post('/auth/register', data);
};

export const postLoginApi = async (credentials) => {
  return await apiHelper.post('/auth/login', credentials);
};

export const getMyProfileApi = async () => {
  return await apiHelper.get('/users/me'); // atau endpoint profil yang dipakai di Delcom API
};