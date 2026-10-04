import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetProfile,
  asyncUpdateProfile,
  asyncUpdateAvatar,
  asyncUpdatePassword,
} from '../states/action';
import useInput from '../../../hooks/useInput';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { profile, isChangeProfile, isChangeProfilePhoto, isChangeProfilePassword } = useSelector(
    (state) => state.users
  );

  const [name, onNameChange, setName] = useInput('');
  const [oldPassword, onOldPasswordChange, , resetOldPassword] = useInput('');
  const [newPassword, onNewPasswordChange, , resetNewPassword] = useInput('');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    dispatch(asyncGetProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
    }
  }, [profile, setName]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateProfile({ name }));
  };

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append('photo', avatarFile);
    dispatch(asyncUpdateAvatar(formData));
    setAvatarFile(null);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(asyncUpdatePassword({ old_password: oldPassword, new_password: newPassword }));
    resetOldPassword();
    resetNewPassword();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Profil Saya</h1>
        <p className="text-slate-500 text-sm">Kelola informasi pribadi dan keamanan akun Anda</p>
      </div>

      {/* Foto Profil */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4">Foto Profil</h2>
        <div className="flex items-center space-x-6">
          <img
            src={profile?.photo || 'https://via.placeholder.com/150'}
            alt="Avatar"
            className="h-20 w-20 rounded-full object-cover border border-slate-200"
          />
          <form onSubmit={handleUploadPhoto} className="flex flex-col space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:py-2 file:px-3 file:text-xs file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
            />
            <button
              type="submit"
              disabled={isChangeProfilePhoto || !avatarFile}
              className="w-fit rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isChangeProfilePhoto ? 'Mengunggah...' : 'Unggah Foto'}
            </button>
          </form>
        </div>
      </div>

      {/* Informasi Profil */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4">Informasi Akun</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Alamat Email</label>
            <input
              type="email"
              disabled
              value={profile?.email || ''}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-sm text-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={isChangeProfile}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isChangeProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>

      {/* Ubah Password */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4">Keamanan Kata Sandi</h2>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Kata Sandi Lama</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={onOldPasswordChange}
              className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Kata Sandi Baru</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={onNewPasswordChange}
              className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isChangeProfilePassword}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isChangeProfilePassword ? 'Memperbarui...' : 'Perbarui Kata Sandi'}
          </button>
        </form>
      </div>
    </div>
  );
}