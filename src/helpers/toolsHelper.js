// SweetAlert2 dimuat hanya saat dialog pertama kali dibutuhkan (mengurangi JavaScript yang tidak terpakai).
const fire = async (options) => {
  const { default: Swal } = await import('sweetalert2');
  return Swal.fire(options);
};

export const showSuccessDialog = (message, title = 'Berhasil') => {
  return fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonColor: '#2563eb',
  });
};

export const showErrorDialog = (message, title = 'Gagal') => {
  return fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#dc2626',
  });
};

export const showConfirmDialog = async (message, title = 'Apakah Anda yakin?') => {
  const result = await fire({
    title,
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, Lanjutkan',
    cancelButtonText: 'Batal',
  });
  return result.isConfirmed;
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Gambar pengganti (abu-abu polos) saat laporan belum punya cover; tidak butuh request jaringan.
export const NO_COVER = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><rect width='400' height='200' fill='#e2e8f0'/></svg>"
)}`;