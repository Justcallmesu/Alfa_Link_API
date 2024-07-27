export enum PenjualanStatus {
  /**
   * General
   */
  BARU = 'Baru',
  CHECKING = 'Customer Checking Mobil',
  MOBIL_DISERAHKAN = 'Mobil Diserahkan',
  SELESAI = 'Selesai',
  PELUNASAN_DP = 'Pelunasan DP',

  /**
   * Status Kredit
   */
  PANJAR = 'Panjar',
  SURVEY = 'Survey',
  MENUNGGU_RESPON = 'Menunggu Respon Pusat',
  PENAMBAHAN_DP = 'PENAMBAHAN DP',
  MENERIMA_PENAMBAHAN_DP = 'Menerima Penambahan DP',

  /**
   * Status Cash
   */
  DITERIMA = 'Diterima',
  NEGOSIASI = 'Negosiasi',

  /**
   * Berhasil
   */
  MENUNGGU_SURAT_PENCAIRAN = 'Menunggu Surat Pencairan',

  /**
   * GAGAL
   */
  TIDAK_SANGGUP_PENAMBAHAN_DP = 'Tidak Sanggup Penambahan DP',
}
