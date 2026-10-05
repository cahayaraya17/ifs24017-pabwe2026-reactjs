import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetProfile,
  asyncUpdateProfile,
  asyncUpdateAvatar,
  asyncUpdatePassword,
} from '../states/action';
import useInput from '../../../hooks/useInput';
import { NO_COVER } from '../../../helpers/toolsHelper';

const inputClass =
  'mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600';

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
        <p className="text-slate-600 text-sm">Kelola informasi pribadi dan keamanan akun Anda</p>
      </div>

      {/* Foto Profil */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4">Foto Profil</h2>
        <div className="flex items-center space-x-6">
          <img
            src={profile?.photo || NO_COVER}
            alt="Foto profil"
            width="80"
            height="80"
            decoding="async"
            className="h-20 w-20 rounded-full object-cover border border-slate-200"
          />
          <form onSubmit={handleUploadPhoto} className="flex flex-col space-y-2">
            <label htmlFor="profile-photo-input" className="text-xs font-semibold text-slate-700">
              Pilih foto baru
            </label>
            <input
              id="profile-photo-input"
              name="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:py-2 file:px-3 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
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
            <label htmlFor="profile-name-input" className="block text-xs font-semibold text-slate-700">
              Nama Lengkap
            </label>
            <input
              id="profile-name-input"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={onNameChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="profile-email-input" className="block text-xs font-semibold text-slate-700">
              Alamat Email
            </label>
            <input
              id="profile-email-input"
              name="email"
              type="email"
              autoComplete="email"
              disabled
              value={profile?.email || ''}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-sm text-slate-600"
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
            <label htmlFor="profile-old-password-input" className="block text-xs font-semibold text-slate-700">
              Kata Sandi Lama
            </label>
            <input
              id="profile-old-password-input"
              name="old_password"
              type="password"
              autoComplete="current-password"
              required
              value={oldPassword}
              onChange={onOldPasswordChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="profile-new-password-input" className="block text-xs font-semibold text-slate-700">
              Kata Sandi Baru
            </label>
            <input
              id="profile-new-password-input"
              name="new_password"
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={onNewPasswordChange}
              className={inputClass}
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