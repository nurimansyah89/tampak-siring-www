export interface NewsItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'Aktif' | 'Non-Aktif';
  category: 'Berita' | 'Pengumuman';
  createdAt: string;
  views: number;
}

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Clubhouse Grand Opening',
    description: 'Rayakan pembukaan fasilitas clubhouse baru akhir pekan ini dengan berbagai acara menarik.',
    thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop',
    status: 'Aktif',
    category: 'Berita',
    createdAt: '12 Mei 2026',
    views: 342,
  },
  {
    id: '2',
    title: 'Maintenance Schedule',
    description: 'Pemberitahuan pemeliharaan rutin jaringan listrik di area Blok A dan B pada hari Selasa depan.',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    status: 'Aktif',
    category: 'Pengumuman',
    createdAt: '10 Mei 2026',
    views: 215,
  },
  {
    id: '3',
    title: 'Security Reminder',
    description: 'Mohon pastikan stiker akses kendaraan terpasang dengan benar untuk kenyamanan bersama.',
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=250&fit=crop',
    status: 'Non-Aktif',
    category: 'Pengumuman',
    createdAt: '8 Mei 2026',
    views: 178,
  },
  {
    id: '4',
    title: 'Kegiatan Sosial Bulanan',
    description: 'Ayo ikuti kegiatan kerja bakti minggu ini dalam rangka menjaga kebersihan dan keindahan cluster.',
    thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop',
    status: 'Aktif',
    category: 'Berita',
    createdAt: '5 Mei 2026',
    views: 421,
  },
  {
    id: '5',
    title: 'Pembayaran Iuran Tahun Baru',
    description: 'Informasi penyesuaian iuran bulanan untuk periode tahun 2026-2027.',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
    status: 'Non-Aktif',
    category: 'Pengumuman',
    createdAt: '1 Mei 2026',
    views: 89,
  },
  {
    id: '6',
    title: 'Fasilitas Gym Diperbarui',
    description: 'Perangkat gym terbaru sudah tersedia. Silakan gunakan dengan bijak dan patuhi aturan yang berlaku.',
    thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop',
    status: 'Aktif',
    category: 'Berita',
    createdAt: '28 April 2026',
    views: 567,
  },
  {
    id: '7',
    title: 'Jadwal Patroli Malam',
    description: 'Mulai bulan depan, jadwal patroli malam akan ditambah menjadi 3 shift untuk keamanan maksimal.',
    thumbnail: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=250&fit=crop',
    status: 'Aktif',
    category: 'Pengumuman',
    createdAt: '25 April 2026',
    views: 198,
  },
  {
    id: '8',
    title: 'Lomba Meriahkan HUT RI',
    description: 'Dalam rangka memperingati HUT RI ke-81, akan diadakan berbagai lomba seru untuk seluruh warga.',
    thumbnail: 'https://images.unsplash.com/photo-1576485290814-1c72aacbdb7c?w=400&h=250&fit=crop',
    status: 'Aktif',
    category: 'Berita',
    createdAt: '20 April 2026',
    views: 712,
  },
];

export const MOCK_TOTAL_VIEWS = 1248;
