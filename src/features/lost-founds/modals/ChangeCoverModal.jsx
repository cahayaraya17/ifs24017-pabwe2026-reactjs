import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUploadCoverLostFound } from '../states/action';

export default function ChangeCoverModal({ isOpen, onClose, id }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { isLostFoundChangeCover } = useSelector((state) => state.lostFounds);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('cover', file);
    await dispatch(asyncUploadCoverLostFound({ id, formData }));
    setFile(null);
    setPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Unggah / Ganti Cover Barang</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {preview && (
            <img src={preview} alt="Pratinjau" className="h-44 w-full rounded-xl object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:py-2 file:px-3 file:text-xs file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
          />
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
              disabled={isLostFoundChangeCover || !file}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:bg-blue-300"
            >
              {isLostFoundChangeCover ? 'Mengunggah...' : 'Unggah Cover'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}