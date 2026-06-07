export type Priority = 'Mendesak' | 'Tinggi' | 'Normal';
export type Status = 'Baru' | 'Diproses' | 'Selesai';
export type Category = 'Infrastruktur' | 'Keamanan' | 'Kebersihan' | 'Fasilitas Umum' | 'Lainnya';

export interface ComplaintAdmin {
  id: string;
  ticketId: string;
  category: Category;
  resident: string;
  location: string;
  initials: string;
  priority: Priority;
  status: Status;
}

export const MOCK_COMPLAINTS_ADMIN: ComplaintAdmin[] = [
  {
    id: '1',
    ticketId: '#COMP-8821',
    category: 'Infrastruktur',
    resident: 'Bpk. Andi Wijaya',
    location: 'Blok A, No. 12',
    initials: 'AW',
    priority: 'Mendesak',
    status: 'Baru',
  },
  {
    id: '2',
    ticketId: '#COMP-8819',
    category: 'Keamanan',
    resident: 'Ibu Sari Dewi',
    location: 'Blok C, No. 04',
    initials: 'SD',
    priority: 'Tinggi',
    status: 'Diproses',
  },
  {
    id: '3',
    ticketId: '#COMP-8792',
    category: 'Kebersihan',
    resident: 'Bpk. Robert King',
    location: 'Blok B, No. 25',
    initials: 'RK',
    priority: 'Normal',
    status: 'Selesai',
  },
  {
    id: '4',
    ticketId: '#COMP-8780',
    category: 'Infrastruktur',
    resident: 'Ibu Maya Putri',
    location: 'Blok D, No. 08',
    initials: 'MP',
    priority: 'Mendesak',
    status: 'Diproses',
  },
  {
    id: '5',
    ticketId: '#COMP-8765',
    category: 'Fasilitas Umum',
    resident: 'Bpk. Hendra Gunawan',
    location: 'Blok A, No. 31',
    initials: 'HG',
    priority: 'Normal',
    status: 'Selesai',
  },
  {
    id: '6',
    ticketId: '#COMP-8750',
    category: 'Lainnya',
    resident: 'Ibu Dewi Lestari',
    location: 'Blok C, No. 17',
    initials: 'DL',
    priority: 'Tinggi',
    status: 'Baru',
  },
  {
    id: '7',
    ticketId: '#COMP-8742',
    category: 'Keamanan',
    resident: 'Bpk. Slamet Riyadi',
    location: 'Blok B, No. 05',
    initials: 'SR',
    priority: 'Normal',
    status: 'Diproses',
  },
  {
    id: '8',
    ticketId: '#COMP-8731',
    category: 'Kebersihan',
    resident: 'Ibu Ratna Sari',
    location: 'Blok D, No. 22',
    initials: 'RS',
    priority: 'Tinggi',
    status: 'Baru',
  },
];

export interface ComplaintMessage {
  id: string;
  author: string;
  isAdmin: boolean;
  date: string;
  content: string;
}

export interface ComplaintAdminDetail {
  id: string;
  ticketId: string;
  category: Category;
  title: string;
  residentName: string;
  location: string;
  initials: string;
  priority: Priority;
  status: Status;
  date: string;
  time: string;
  description: string;
  messages: ComplaintMessage[];
}

export const MOCK_COMPLAINT_ADMIN_DETAILS: ComplaintAdminDetail[] = [
  {
    id: '1',
    ticketId: '#COMP-8821',
    category: 'Infrastruktur',
    title: 'Infrastruktur - Pembuangan Sampah',
    residentName: 'Bpk. Andi Wijaya',
    location: 'Blok A, No. 12',
    initials: 'AW',
    priority: 'Mendesak',
    status: 'Baru',
    date: '24 Oktober 2023',
    time: '09:15',
    description:
      'Truk pengangkut sampah belum mengunjungi Blok A selama tiga hari terakhir. Ada penumpukan kantong sampah yang signifikan di dekat pintu masuk No. 12, dan mulai menimbulkan bau yang cukup menyengat. Ini mulai menjadi risiko kesehatan. Mohon periksa jadwalnya.',
    messages: [
      {
        id: 'm1',
        author: 'Bpk. Andi Wijaya',
        isAdmin: false,
        date: '24 Okt 2023, 09:15',
        content:
          'Truk pengangkut sampah belum mengunjungi Blok A selama tiga hari terakhir. Ada penumpukan kantong sampah yang signifikan di dekat pintu masuk No. 12, dan mulai menimbulkan bau yang cukup menyengat. Ini mulai menjadi risiko kesehatan. Mohon periksa jadwalnya.',
      },
    ],
  },
  {
    id: '2',
    ticketId: '#COMP-8819',
    category: 'Keamanan',
    title: 'Keamanan - Pos Jaga Tidak Beroperasi',
    residentName: 'Ibu Sari Dewi',
    location: 'Blok C, No. 04',
    initials: 'SD',
    priority: 'Tinggi',
    status: 'Diproses',
    date: '23 Oktober 2023',
    time: '14:30',
    description:
      'Pos jaga keamanan di pintu belakang tidak beroperasi sejak dua hari yang lalu. Tidak ada petugas yang berjaga, dan portal masuk selalu terbuka. Hal ini sangat mengkhawatirkan untuk keamanan warga.',
    messages: [
      {
        id: 'm1',
        author: 'Ibu Sari Dewi',
        isAdmin: false,
        date: '23 Okt 2023, 14:30',
        content:
          'Pos jaga keamanan di pintu belakang tidak beroperasi sejak dua hari yang lalu. Tidak ada petugas yang berjaga, dan portal masuk selalu terbuka. Hal ini sangat mengkhawatirkan untuk keamanan warga.',
      },
      {
        id: 'm2',
        author: 'Admin Sarah',
        isAdmin: true,
        date: '23 Okt 2023, 16:45',
        content:
          'Selamat siang Ibu Sari, terima kasih atas laporannya. Kami sedang menghubungi koordinator keamanan untuk menugaskan petugas pengganti. Kami akan update kembali dalam waktu 1x24 jam.',
      },
    ],
  },
  {
    id: '3',
    ticketId: '#COMP-8792',
    category: 'Kebersihan',
    title: 'Kebersihan - TPS Penuh',
    residentName: 'Bpk. Robert King',
    location: 'Blok B, No. 25',
    initials: 'RK',
    priority: 'Normal',
    status: 'Selesai',
    date: '20 Oktober 2023',
    time: '10:00',
    description:
      'Tempat Pembuangan Sementara (TPS) di ujung Blok B sudah penuh dan belum diangkut selama hampir seminggu. Mohon segera dilakukan pengangkutan agar tidak menimbulkan bau dan penyakit.',
    messages: [
      {
        id: 'm1',
        author: 'Bpk. Robert King',
        isAdmin: false,
        date: '20 Okt 2023, 10:00',
        content:
          'Tempat Pembuangan Sementara (TPS) di ujung Blok B sudah penuh dan belum diangkut selama hampir seminggu. Mohon segera dilakukan pengangkutan agar tidak menimbulkan bau dan penyakit.',
      },
      {
        id: 'm2',
        author: 'Admin Sarah',
        isAdmin: true,
        date: '20 Okt 2023, 11:30',
        content:
          'Selamat siang Bpk. Robert, kami akan segera menghubungi pihak pengangkut sampah untuk penjemputan hari ini.',
      },
      {
        id: 'm3',
        author: 'Admin Sarah',
        isAdmin: true,
        date: '21 Okt 2023, 08:00',
        content: 'Update: Sampah sudah berhasil diangkut pagi ini oleh petugas. TPS sudah bersih kembali.',
      },
    ],
  },
];

export const CATEGORIES: Category[] = [
  'Infrastruktur',
  'Keamanan',
  'Kebersihan',
  'Fasilitas Umum',
  'Lainnya',
];
