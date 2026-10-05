import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetLostFounds, asyncGetDailyStats, asyncDeleteLostFound } from '../states/action';
import { showConfirmDialog, formatDate, NO_COVER } from '../../../helpers/toolsHelper';
import AddModal from '../modals/AddModal';
import ChangeModal from '../modals/ChangeModal';
import { IconSearch, IconPlus, IconCheck, IconClock } from '@tabler/icons-react';

export default function HomePage() {
  const dispatch = useDispatch();
  const { lostFounds, lostFoundStats, isLostFound } = useSelector((state) => state.lostFounds);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(asyncGetLostFounds({ status: filterStatus }));
    dispatch(asyncGetDailyStats());
  }, [dispatch, filterStatus]);

  const handleDelete = async (id) => {
    const confirmed = await showConfirmDialog('Laporan ini akan dihapus permanen.');
    if (confirmed) {
      dispatch(asyncDeleteLostFound(id));
    }
  };

  // Memastikan data selalu dibaca sebagai array
  const itemsList = Array.isArray(lostFounds)
    ? lostFounds
    : (lostFounds?.lost_founds || []);

  const filteredItems = itemsList.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Lost &amp; Founds</h1>
          <p className="text-slate-600 text-sm">Pusat informasi barang hilang dan barang temuan</p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center space-x-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700"
        >
          <IconPlus size={18} aria-hidden="true" />
          <span>Buat Laporan</span>
        </button>
      </div>

      {/* Ringkasan Metrik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-600">Total Laporan</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">
            {lostFoundStats?.total ?? itemsList.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-red-700">Barang Hilang</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">
            {lostFoundStats?.lost || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-emerald-700">Barang Ditemukan</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">
            {lostFoundStats?.found || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-blue-700">Selesai</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">
            {lostFoundStats?.completed || 0}
          </p>
        </div>
      </div>

      {/* Filter & Live Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3.5 top-3 text-slate-600" size={18} aria-hidden="true" />
          <input
            id="search-input"
            type="search"
            name="search"
            autoComplete="off"
            aria-label="Cari berdasarkan nama barang"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama barang..."
            className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          />
        </div>
        <select
          id="filter-status"
          name="status"
          aria-label="Filter status laporan"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <option value="">Semua Status</option>
          <option value="lost">Kehilangan (Lost)</option>
          <option value="found">Ditemukan (Found)</option>
        </select>
      </div>

      {/* Daftar Kartu Barang */}
      {isLostFound ? (
        <p className="text-slate-600 text-sm py-4">Memuat data barang...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-slate-600 text-sm py-8 text-center bg-white rounded-2xl border border-slate-200">
          Tidak ada laporan barang ditemukan.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <img
                  src={item.cover || NO_COVER}
                  alt={item.cover ? `Foto ${item.title}` : ''}
                  width="400"
                  height="176"
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'lost'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="flex items-center space-x-1 text-[11px] font-semibold text-slate-600">
                      {item.is_completed ? (
                        <span className="text-blue-700 flex items-center">
                          <IconCheck size={14} className="mr-0.5" aria-hidden="true" /> Selesai
                        </span>
                      ) : (
                        <span className="text-amber-800 flex items-center">
                          <IconClock size={14} className="mr-0.5" aria-hidden="true" /> Proses
                        </span>
                      )}
                    </span>
                  </div>
                  <h2 className="font-bold text-slate-800 text-base line-clamp-1">{item.title}</h2>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                </div>
              </div>
              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <span className="text-[11px] text-slate-600">{formatDate(item.created_at)}</span>
                <div className="space-x-2 text-xs font-semibold">
                  <Link
                    to={`/lost-founds/${item.id}`}
                    aria-label={`Detail ${item.title}`}
                    className="text-blue-700 hover:underline"
                  >
                    Detail
                  </Link>
                  <button
                    type="button"
                    aria-label={`Ubah ${item.title}`}
                    onClick={() => setSelectedItem(item)}
                    className="text-amber-800 hover:underline"
                  >
                    Ubah
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus ${item.title}`}
                    onClick={() => handleDelete(item.id)}
                    className="text-red-700 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <ChangeModal
        isOpen={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}