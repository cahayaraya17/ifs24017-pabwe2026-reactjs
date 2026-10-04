import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncRegister } from '../states/action';

export default function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthRegister } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(asyncRegister({ name, email, password }));
    if (!result.error) {
      navigate('/auth/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700">Nama Lengkap</label>
        <input
          type="text"
          required
          value={name}
          onChange={onNameChange}
          placeholder="Nama Anda"
          className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={onEmailChange}
          placeholder="nama@delcom.org"
          className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700">Kata Sandi</label>
        <input
          type="password"
          required
          value={password}
          onChange={onPasswordChange}
          placeholder="••••••••"
          className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isAuthRegister}
        className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {isAuthRegister ? 'Mendaftarkan...' : 'Daftar Akun'}
      </button>
      <p className="text-center text-sm text-slate-600 pt-2">
        Sudah memiliki akun?{' '}
        <Link to="/auth/login" className="font-semibold text-blue-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}