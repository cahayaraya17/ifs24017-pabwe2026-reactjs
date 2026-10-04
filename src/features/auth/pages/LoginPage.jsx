import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncLogin } from '../states/action';

export default function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const { isAuthLogin } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncLogin({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        disabled={isAuthLogin}
        className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {isAuthLogin ? 'Memverifikasi...' : 'Masuk Sekarang'}
      </button>
      <p className="text-center text-sm text-slate-600 pt-2">
        Belum memiliki akun?{' '}
        <Link to="/auth/register" className="font-semibold text-blue-600 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}