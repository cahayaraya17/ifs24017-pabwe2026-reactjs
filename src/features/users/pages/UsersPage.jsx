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
        <p className="text-slate-500 text-sm">Seluruh anggota terdaftar dalam sistem Delcom Lost & Founds</p>
      </div>

      {userList.length === 0 ? (
        <p className="text-slate-500 text-sm py-4">Tidak ada data pengguna atau sedang memuat...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userList.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              {user.photo ? (
                <img src={user.photo} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                  <IconUser size={24} />
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="truncate font-semibold text-slate-800">{user.name}</h3>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}