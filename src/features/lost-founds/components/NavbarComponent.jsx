import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogout } from '../../auth/states/action';
import { IconLogout, IconUser } from '@tabler/icons-react';

export default function NavbarComponent() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="font-bold text-slate-800 text-lg">Delcom Lost & Founds</div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          {profile?.photo ? (
            <img src={profile.photo} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <IconUser size={18} />
            </div>
          )}
          <span className="font-semibold hidden sm:inline">{profile?.name || 'Pengguna'}</span>
        </div>
        <button
          onClick={() => dispatch(asyncLogout())}
          className="flex items-center space-x-1 text-sm font-semibold text-red-600 hover:text-red-700"
        >
          <IconLogout size={18} />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
}