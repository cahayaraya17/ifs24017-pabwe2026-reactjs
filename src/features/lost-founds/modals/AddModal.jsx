import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncAddLostFound } from '../states/action';

export default function AddModal({ isOpen, onClose }) {
  const [title, onTitleChange, , resetTitle] = useInput('');
  const [description, onDescriptionChange, , resetDesc] = useInput('');
  const [status, setStatus] = useState('lost');
  const dispatch = useDispatch();
  const { isLostFoundAdd } = useSelector((state) => state.lostFounds);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(asyncAddLostFound({ title, description, status }));
    resetTitle();
    resetDesc();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Buat Laporan Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Jenis Laporan</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => setStatus('lost')}
                className={`py-2 text-xs font-bold rounded-xl border ${
                  status === 'lost'
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Kehilangan (Lost)
              </button>
              <button
                type="button"
                onClick={() => setStatus('found')}
                className={`py-2 text-xs font-bold rounded-xl border ${
                  status === 'found'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Penemuan (Found)
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Nama/Judul Barang</label>
            <input
              type="text"
              required
              value={title}
              onChange={onTitleChange}
              placeholder="Contoh: Dompet Kulit Hitam"
              className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Rincian & Lokasi</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={onDescriptionChange}
              placeholder="Jelaskan ciri khusus dan perkiraan lokasi..."
              className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLostFoundAdd}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:bg-blue-300"
            >
              {isLostFoundAdd ? 'Menyimpan...' : 'Simpan Laporan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}