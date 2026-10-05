import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetUsers } from '../states/action';
import { IconUser } from '@tabler/icons-react';

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncGetUsers());
  }, [dispatch]);

  // Validasi agar data selalu dibaca sebagai array
  const userList = Array.isArray(users)
    ? users
    : (users?.users || []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Daftar Pengguna</h1>
        <p className="text-slate-600 text-sm">Seluruh anggota terdaftar dalam sistem Delcom Lost &amp; Founds</p>
      </div>

      {userList.length === 0 ? (
        <p className="text-slate-600 text-sm py-4">Tidak ada data pengguna atau sedang memuat...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userList.map((user) => (
            <li
              key={user.id}
              className="flex items-center space-x-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              {user.photo ? (
                <img
                  src={user.photo}
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                  <IconUser size={24} />
                </div>
              )}
              <div className="overflow-hidden">
                <h2 className="truncate font-semibold text-slate-800">{user.name}</h2>
                <p className="truncate text-xs text-slate-600">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}