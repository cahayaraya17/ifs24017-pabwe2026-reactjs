import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetDetailLostFound, asyncDeleteLostFound } from '../states/action';
import { clearDetailLostFound } from '../states/reducer';
import { formatDate, showConfirmDialog, NO_COVER } from '../../../helpers/toolsHelper';
import ChangeCoverModal from '../modals/ChangeCoverModal';
import ChangeModal from '../modals/ChangeModal';
import { IconArrowLeft, IconCheck, IconClock, IconTrash, IconEdit, IconPhoto } from '@tabler/icons-react';

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lostFound, isLostFound } = useSelector((state) => state.lostFounds);

  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetDetailLostFound(id));
    return () => {
      dispatch(clearDetailLostFound());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog('Hapus laporan ini secara permanen?');
    if (confirmed) {
      await dispatch(asyncDeleteLostFound(id));
      navigate('/');
    }
  };

  if (isLostFound || !lostFound) {
    return <p className="text-slate-600 text-sm">Memuat rincian laporan...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/"
        className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-700 hover:underline"
      >
        <IconArrowLeft size={16} aria-hidden="true" />
        <span>Kembali ke Laporan</span>
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="relative">
          <img
            src={lostFound.cover || NO_COVER}
            alt={lostFound.cover ? `Foto ${lostFound.title}` : ''}
            width="800"
            height="288"
            decoding="async"
            className="w-full h-72 object-cover"
          />
          <button
            type="button"
            onClick={() => setIsCoverOpen(true)}
            className="absolute right-4 bottom-4 flex items-center space-x-1.5 rounded-xl bg-white/90 backdrop-blur px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-white"
          >
            <IconPhoto size={16} aria-hidden="true" />
            <span>Ganti Cover</span>
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                  lostFound.status === 'lost'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {lostFound.status}
              </span>
              <span className="flex items-center space-x-1 text-xs font-bold">
                {lostFound.is_completed ? (
                  <span className="text-blue-700 flex items-center bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    <IconCheck size={14} className="mr-1" aria-hidden="true" /> Selesai
                  </span>
                ) : (
                  <span className="text-amber-800 flex items-center bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <IconClock size={14} className="mr-1" aria-hidden="true" /> Dalam Pencarian
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="flex items-center space-x-1 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
              >
                <IconEdit size={16} aria-hidden="true" />
                <span>Ubah Data</span>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center space-x-1 rounded-xl bg-red-50 hover:bg-red-100 px-3 py-2 text-xs font-bold text-red-700"
              >
                <IconTrash size={16} aria-hidden="true" />
                <span>Hapus</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900">{lostFound.title}</h1>
            <p className="text-xs text-slate-600 mt-1">Dilaporkan pada: {formatDate(lostFound.created_at)}</p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Deskripsi &amp; Lokasi
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {lostFound.description}
            </p>
          </div>
        </div>
      </div>

      <ChangeCoverModal isOpen={isCoverOpen} onClose={() => setIsCoverOpen(false)} id={id} />
      <ChangeModal isOpen={isEditOpen} item={lostFound} onClose={() => setIsEditOpen(false)} />
    </div>
  );
}