import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-slate-200">
        <div className="mb-6 text-center">
          <div
            aria-hidden="true"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white font-black text-2xl shadow-blue-200 shadow-lg"
          >
            LF
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-800">
            Delcom Lost &amp; Founds
          </h1>
          <p className="text-sm text-slate-600 mt-1">Layanan Informasi Kehilangan &amp; Penemuan Barang</p>
        </div>
        <Outlet />
      </div>
    </main>
  );
}