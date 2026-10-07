import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncRegister } from '../states/action';

const inputClass =
  'mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600';

export default function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

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
        <label htmlFor="register-name-input" className="block text-sm font-semibold text-slate-700">
          Nama Lengkap
        </label>
        <input
          id="register-name-input"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={onNameChange}
          placeholder="Nama Anda"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="register-email-input" className="block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="register-email-input"
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
        <label htmlFor="register-password-input" className="block text-sm font-semibold text-slate-700">
          Kata Sandi
        </label>
        <input
          id="register-password-input"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={onPasswordChange}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>
      <button
        id="register-submit-button"
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {isLoading ? 'Mendaftarkan...' : 'Daftar Akun'}
      </button>
      <p className="text-center text-sm text-slate-600 pt-2">
        Sudah memiliki akun?{' '}
        <Link to="/auth/login" className="font-semibold text-blue-700 underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}