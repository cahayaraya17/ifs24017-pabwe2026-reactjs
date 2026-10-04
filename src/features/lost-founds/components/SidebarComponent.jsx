import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconPackage, IconUsers, IconUser } from '@tabler/icons-react';

export default function SidebarComponent() {
  const linkClass = ({ isActive }) =>
    `flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
      isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4 flex flex-col space-y-1">
      <div className="flex items-center space-x-3 px-4 py-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-black text-sm">
          LF
        </div>
        <span className="font-bold text-slate-800 tracking-tight">Delcom Portal</span>
      </div>
      <NavLink to="/" end className={linkClass}>
        <IconPackage size={20} />
        <span>Laporan Barang</span>
      </NavLink>
      <NavLink to="/users" className={linkClass}>
        <IconUsers size={20} />
        <span>Pengguna</span>
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        <IconUser size={20} />
        <span>Profil Saya</span>
      </NavLink>
    </aside>
  );
}