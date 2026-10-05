import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncAddLostFound } from '../states/action';

const inputClass =
  'mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600';

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
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-modal-title"
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 id="add-modal-title" className="text-lg font-bold text-slate-800 mb-4">
          Buat Laporan Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset>
            <legend className="block text-xs font-semibold text-slate-700">Jenis Laporan</legend>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                aria-pressed={status === 'lost'}
                onClick={() => setStatus('lost')}
                className={`py-2 text-xs font-bold rounded-xl border ${
                  status === 'lost'
                    ? 'border-red-700 bg-red-50 text-red-700'
                    : 'border-slate-300 text-slate-700'
                }`}
              >
                Kehilangan (Lost)
              </button>
              <button
                type="button"
                aria-pressed={status === 'found'}
                onClick={() => setStatus('found')}
                className={`py-2 text-xs font-bold rounded-xl border ${
                  status === 'found'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-700'
                    : 'border-slate-300 text-slate-700'
                }`}
              >
                Penemuan (Found)
              </button>
            </div>
          </fieldset>
          <div>
            <label htmlFor="add-title-input" className="block text-xs font-semibold text-slate-700">
              Nama/Judul Barang
            </label>
            <input
              id="add-title-input"
              name="title"
              type="text"
              autoComplete="off"
              required
              value={title}
              onChange={onTitleChange}
              placeholder="Contoh: Dompet Kulit Hitam"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="add-description-input" className="block text-xs font-semibold text-slate-700">
              Rincian &amp; Lokasi
            </label>
            <textarea
              id="add-description-input"
              name="description"
              required
              rows={3}
              value={description}
              onChange={onDescriptionChange}
              placeholder="Jelaskan ciri khusus dan perkiraan lokasi..."
              className={inputClass}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
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