import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncUpdateLostFound } from '../states/action';

const inputClass =
  'mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600';

export default function ChangeModal({ isOpen, onClose, item }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [description, onDescriptionChange, setDesc] = useInput('');
  const [status, setStatus] = useState('lost');
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useDispatch();
  const { isLostFoundChange } = useSelector((state) => state.lostFounds);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setDesc(item.description || '');
      setStatus(item.status || 'lost');
      setIsCompleted(Boolean(item.is_completed));
    }
  }, [item, setTitle, setDesc]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      asyncUpdateLostFound({
        id: item.id,
        data: {
          title,
          description,
          status,
          is_completed: isCompleted ? 1 : 0,
        },
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-modal-title"
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 id="change-modal-title" className="text-lg font-bold text-slate-800 mb-4">
          Ubah Laporan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="change-title-input" className="block text-xs font-semibold text-slate-700">
              Nama/Judul Barang
            </label>
            <input
              id="change-title-input"
              name="title"
              type="text"
              autoComplete="off"
              required
              value={title}
              onChange={onTitleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="change-description-input" className="block text-xs font-semibold text-slate-700">
              Deskripsi
            </label>
            <textarea
              id="change-description-input"
              name="description"
              required
              rows={3}
              value={description}
              onChange={onDescriptionChange}
              className={inputClass}
            />
          </div>
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="is_completed"
              name="is_completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="h-4 w-4 rounded text-blue-600"
            />
            <label htmlFor="is_completed" className="text-xs font-semibold text-slate-700">
              Tandai laporan ini sudah selesai
            </label>
          </div>
          <div className="flex justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLostFoundChange}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:bg-blue-300"
            >
              {isLostFoundChange ? 'Menyimpan...' : 'Perbarui'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}