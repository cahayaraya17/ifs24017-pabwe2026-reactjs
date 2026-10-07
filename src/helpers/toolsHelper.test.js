import { describe, it, expect, vi, beforeEach } from 'vitest';

const fire = vi.fn();
vi.mock('sweetalert2', () => ({ default: { fire: (...a) => fire(...a) } }));

import {
  showSuccessDialog,
  showErrorDialog,
  showConfirmDialog,
  formatDate,
  NO_COVER,
} from './toolsHelper';

describe('toolsHelper', () => {
  beforeEach(() => fire.mockReset());

  it('showSuccessDialog memanggil Swal dengan icon success', async () => {
    fire.mockResolvedValue({});
    await showSuccessDialog('ok');
    expect(fire).toHaveBeenCalledWith(expect.objectContaining({ icon: 'success', text: 'ok', title: 'Berhasil' }));
  });

  it('showErrorDialog memanggil Swal dengan icon error', async () => {
    fire.mockResolvedValue({});
    await showErrorDialog('bad', 'Judul');
    expect(fire).toHaveBeenCalledWith(expect.objectContaining({ icon: 'error', text: 'bad', title: 'Judul' }));
  });

  it('showConfirmDialog mengembalikan isConfirmed', async () => {
    fire.mockResolvedValueOnce({ isConfirmed: true });
    expect(await showConfirmDialog('yakin?')).toBe(true);
    fire.mockResolvedValueOnce({ isConfirmed: false });
    expect(await showConfirmDialog('yakin?')).toBe(false);
  });

  it('formatDate', () => {
    expect(formatDate()).toBe('-');
    expect(formatDate('2025-01-15T10:30:00')).toContain('2025');
  });

  it('NO_COVER adalah data URI svg', () => {
    expect(NO_COVER.startsWith('data:image/svg+xml,')).toBe(true);
  });
});