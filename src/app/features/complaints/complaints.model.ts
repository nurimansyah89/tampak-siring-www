export type Priority = 'Rendah' | 'Sedang' | 'Tinggi';
export type Status = 'Terkirim' | 'Proses' | 'Selesai';

export interface Complaint {
  id: string;
  date: string;
  title: string;
  resident: string;
  priority: Priority;
  status: Status;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  isAdmin: boolean;
  date: string;
  content: string;
}

export interface ComplaintDetail extends Complaint {
  description: string;
  category: string;
  location: string;
  imageUrls: string[];
  timeline: TimelineEvent[];
  comments: Comment[];
}

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: '1',
    date: '12 Okt 2025',
    title: 'Lampu Jalan Padam di Blok A',
    resident: 'Bpk. Slamet',
    priority: 'Tinggi',
    status: 'Proses',
  },
  {
    id: '2',
    date: '10 Okt 2025',
    title: 'Sampah Belum Diangkut',
    resident: 'Anonim',
    priority: 'Sedang',
    status: 'Terkirim',
  },
  {
    id: '3',
    date: '08 Okt 2025',
    title: 'Pohon Tumbang Jalur Utama',
    resident: 'Ibu Ratna',
    priority: 'Tinggi',
    status: 'Selesai',
  },
  {
    id: '4',
    date: '05 Okt 2025',
    title: 'Genangan Air di Depan Gerbang',
    resident: 'Bpk. Hendra',
    priority: 'Rendah',
    status: 'Terkirim',
  },
  {
    id: '5',
    date: '01 Okt 2025',
    title: 'Fasilitas Playground Rusak',
    resident: 'Ibu Dewi',
    priority: 'Sedang',
    status: 'Proses',
  },
];

export const MOCK_COMPLAINT_DETAILS: ComplaintDetail[] = [
  {
    id: '1',
    date: '12 Okt 2025',
    title: 'Lampu Jalan Padam di Blok A',
    resident: 'Bpk. Andi Wijaya',
    priority: 'Tinggi',
    status: 'Proses',
    description:
      'Sudah 2 malam lampu jalan di depan rumah Blok A No. 12 sampai No. 15 padam total. Hal ini menyebabkan area tersebut sangat gelap dan rawan keamanan, terutama saat malam hari. Mohon pihak pengelola cluster segera melakukan pengecekan dan penggantian bohlam atau perbaikan instalasi kabel yang mungkin bermasalah.',
    category: 'Infrastruktur',
    location: 'Blok A, No. 12 - 15',
    imageUrls: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    ],
    timeline: [
      {
        date: 'Hari ini, 09:15',
        title: 'Petugas Dalam Perjalanan',
        description: 'Teknisi listrik ditugaskan untuk mengecek trafo di area Blok A.',
        isActive: true,
      },
      {
        date: '12 Okt, 20:05',
        title: 'Laporan Diterima',
        description: 'Admin cluster telah memverifikasi laporan dan meneruskan ke tim teknis.',
      },
      {
        date: '12 Okt, 19:45',
        title: 'Laporan Terkirim',
        description: 'Laporan baru dibuat oleh warga di Blok A.',
      },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Budi Santoso',
        avatar: '',
        isAdmin: false,
        date: '13 Okt, 08:30',
        content: 'Betul pak, saya lewat semalam memang gelap sekali. Bahaya buat anak-anak kalau lari-lari di sana.',
      },
      {
        id: 'c2',
        author: 'Tim Maintenance (Admin)',
        avatar: '',
        isAdmin: true,
        date: '13 Okt, 09:15',
        content: 'Terima kasih laporannya Bapak Budi dan Bapak Andi. Petugas teknisi kami sedang menuju lokasi untuk pengecekan gardu blok A.',
      },
    ],
  },
  {
    id: '2',
    date: '10 Okt 2025',
    title: 'Sampah Belum Diangkut',
    resident: 'Anonim',
    priority: 'Sedang',
    status: 'Terkirim',
    description:
      'Sampah di TPS Blok C sudah menumpuk selama 3 hari dan belum diangkut oleh petugas kebersihan. Bau tidak sedap mulai tercium hingga ke pemukiman warga sekitar. Mohon segera ditindaklanjuti.',
    category: 'Kebersihan',
    location: 'TPS Blok C',
    imageUrls: [
      'https://images.unsplash.com/photo-1526951521990-620b14d5f0d0?w=800&q=80',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    ],
    timeline: [
      {
        date: '10 Okt, 14:30',
        title: 'Laporan Terkirim',
        description: 'Laporan baru dibuat oleh warga.',
        isActive: true,
      },
    ],
    comments: [],
  },
  {
    id: '3',
    date: '08 Okt 2025',
    title: 'Pohon Tumbang Jalur Utama',
    resident: 'Ibu Ratna',
    priority: 'Tinggi',
    status: 'Selesai',
    description:
      'Pohon di jalur utama masuk cluster tumbang setelah hujan deras semalam. Akses jalan terhalang total dan kabel listrik terkena ranting. Situasi cukup berbahaya dan perlu penanganan segera.',
    category: 'Keamanan',
    location: 'Jalur Utama, Depan Gerbang',
    imageUrls: [
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    ],
    timeline: [
      {
        date: '08 Okt, 16:00',
        title: 'Aduan Selesai',
        description: 'Lokasi sudah dibersihkan dan akses jalan kembali normal.',
      },
      {
        date: '08 Okt, 11:20',
        title: 'Petugas Dikerahkan',
        description: 'Tim kebersihan dan teknisi dikerahkan ke lokasi.',
      },
      {
        date: '08 Okt, 07:15',
        title: 'Laporan Terkirim',
        description: 'Laporan baru dibuat oleh warga.',
        isActive: true,
      },
    ],
    comments: [
      {
        id: 'c3',
        author: 'Pak RT',
        avatar: '',
        isAdmin: false,
        date: '08 Okt, 08:00',
        content: 'Saya sudah koordinasi dengan pengelola. Tim akan segera turun.',
      },
      {
        id: 'c4',
        author: 'Tim Maintenance (Admin)',
        avatar: '',
        isAdmin: true,
        date: '08 Okt, 11:00',
        content: 'Update: Tim sedang dalam perjalanan menuju lokasi.',
      },
      {
        id: 'c5',
        author: 'Ibu Ratna',
        avatar: '',
        isAdmin: false,
        date: '08 Okt, 17:00',
        content: 'Terima kasih untuk respon cepatnya. Akses sudah normal kembali.',
      },
    ],
  },
  {
    id: '4',
    date: '05 Okt 2025',
    title: 'Genangan Air di Depan Gerbang',
    resident: 'Bpk. Hendra',
    priority: 'Rendah',
    status: 'Terkirim',
    description:
      'Setiap hujan deras, area depan gerbang utama selalu tergenang air setinggi mata kaki. Saluran air tersumbat oleh sampah dan lumpur. Mohon dilakukan pembersihan saluran secara berkala.',
    category: 'Infrastruktur',
    location: 'Gerbang Utama',
    imageUrls: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80',
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80',
    ],
    timeline: [
      {
        date: '05 Okt, 10:00',
        title: 'Laporan Terkirim',
        description: 'Laporan baru dibuat oleh warga.',
        isActive: true,
      },
    ],
    comments: [],
  },
  {
    id: '5',
    date: '01 Okt 2025',
    title: 'Fasilitas Playground Rusak',
    resident: 'Ibu Dewi',
    priority: 'Sedang',
    status: 'Proses',
    description:
      'Ayunan dan perosotan di playground anak-anak mengalami kerusakan. Beberapa baut longgar dan papan kayu mulai lapuk. Dikhawatirkan dapat membahayakan anak-anak yang bermain.',
    category: 'Fasilitas Umum',
    location: 'Area Playground, Blok B',
    imageUrls: [
      'https://images.unsplash.com/photo-1567095761054-7a02e69e5b43?w=800&q=80',
      'https://images.unsplash.com/photo-1596997000108-b34b8ed1bb1f?w=800&q=80',
    ],
    timeline: [
      {
        date: '03 Okt, 13:45',
        title: 'Sedang Diperbaiki',
        description: 'Teknisi sedang melakukan perbaikan pada bagian ayunan.',
        isActive: true,
      },
      {
        date: '01 Okt, 16:20',
        title: 'Laporan Diterima',
        description: 'Admin telah mencatat laporan dan menjadwalkan perbaikan.',
      },
      {
        date: '01 Okt, 14:30',
        title: 'Laporan Terkirim',
        description: 'Laporan baru dibuat oleh warga.',
      },
    ],
    comments: [
      {
        id: 'c6',
        author: 'Bpk. Hendra',
        avatar: '',
        isAdmin: false,
        date: '02 Okt, 09:00',
        content: 'Setuju, mohon segera diperbaiki. Anak-anak saya sering main di sana.',
      },
    ],
  },
];

export interface ComplaintFormData {
  title: string;
  detail: string;
  priority: Priority;
  isAnonymous: boolean;
  file: File | null;
}
