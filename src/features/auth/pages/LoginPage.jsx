import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncLogin } from '../states/action';

const inputClass =
  'mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600';

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
        <label htmlFor="login-email-input" className="block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="login-email-input"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={onEmailChange}
          placeholder="nama@delcom.org"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="login-password-input" className="block text-sm font-semibold text-slate-700">
          Kata Sandi
        </label>
        <input
          id="login-password-input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={onPasswordChange}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>
      <button
        id="login-submit-button"
        type="submit"
        disabled={isAuthLogin}
        className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {isAuthLogin ? 'Memverifikasi...' : 'Masuk Sekarang'}
      </button>
      <p className="text-center text-sm text-slate-600 pt-2">
        Belum memiliki akun?{' '}
        <Link to="/auth/register" className="font-semibold text-blue-700 underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}