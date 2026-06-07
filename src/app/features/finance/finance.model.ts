export interface Transaction {
  date: string;
  description: string;
  ref: string;
  type: 'MASUK' | 'KELUAR';
  nominal: number;
}

export interface MonthlyCashFlow {
  month: string;
  pemasukan: number;
  pengeluaran: number;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  { date: '12 Jun 2024', description: 'Iuran Kebersihan - Blok A12', ref: '#TRS-00129', type: 'MASUK', nominal: 250000 },
  { date: '10 Jun 2024', description: 'Pembayaran Tagihan Listrik Fasum', ref: 'PLN Cluster - Mei', type: 'KELUAR', nominal: 3420000 },
  { date: '08 Jun 2024', description: 'Iuran Keamanan - Blok C02', ref: '#TRS-00128', type: 'MASUK', nominal: 250000 },
  { date: '05 Jun 2024', description: 'Gaji Petugas Kebersihan', ref: '4 Petugas - Juni', type: 'KELUAR', nominal: 8000000 },
  { date: '02 Jun 2024', description: 'Donasi Kegiatan Warga', ref: 'Persiapan HUT RI', type: 'MASUK', nominal: 1500000 },
  { date: '28 Mei 2024', description: 'Iuran Keamanan - Blok D05', ref: '#TRS-00127', type: 'MASUK', nominal: 250000 },
  { date: '25 Mei 2024', description: 'Pembelian Perlengkapan Kantor', ref: 'ATK Bulanan', type: 'KELUAR', nominal: 450000 },
  { date: '20 Mei 2024', description: 'Iuran Kebersihan - Blok B08', ref: '#TRS-00126', type: 'MASUK', nominal: 250000 },
];

export const MOCK_CASH_FLOW: MonthlyCashFlow[] = [
  { month: 'Jan', pemasukan: 28400000, pengeluaran: 12150000 },
  { month: 'Feb', pemasukan: 32000000, pengeluaran: 15200000 },
  { month: 'Mar', pemasukan: 25600000, pengeluaran: 18100000 },
  { month: 'Apr', pemasukan: 38400000, pengeluaran: 9800000 },
  { month: 'Mei', pemasukan: 29600000, pengeluaran: 16800000 },
  { month: 'Jun', pemasukan: 14255000, pengeluaran: 8000000 },
];

export const MOCK_SUMMARY = {
  totalSaldo: 142550000,
  pemasukanBulanIni: 28400000,
  pengeluaranBulanIni: 12150000,
  pemasukanPersen: 85,
  pengeluaranPersen: 42,
  persenBulanLalu: 4.2,
  anggaranOperasional: 42,
};
