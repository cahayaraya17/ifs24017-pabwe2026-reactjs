import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './features/auth/layouts/AuthLayout';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import LostFoundLayout from './features/lost-founds/layouts/LostFoundLayout';
import HomePage from './features/lost-founds/pages/HomePage';
import DetailPage from './features/lost-founds/pages/DetailPage';
import UsersPage from './features/users/pages/UsersPage';
import ProfilePage from './features/users/pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      {/* Jalur Autentikasi Publik */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route index element={<Navigate to="/auth/login" replace />} />
      </Route>

      {/* Jalur Utama Terproteksi */}
      <Route path="/" element={<LostFoundLayout />}>
        <Route index element={<HomePage />} />
        <Route path="lost-founds" element={<HomePage />} />
        <Route path="lost-founds/:id" element={<DetailPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback Jalur Tidak Dikenal */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}