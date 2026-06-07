export interface SecurityPersonnel {
  id: string;
  name: string;
  role: string;
  status: 'bertugas' | 'istirahat';
  imageUrl?: string;
}

export interface SopItem {
  text: string;
}

export const MOCK_PERSONNEL: SecurityPersonnel[] = [
  {
    id: '1',
    name: 'Pak Budi Santoso',
    role: 'Komandan Regu A',
    status: 'bertugas',
    imageUrl: 'https://i.pravatar.cc/400?u=budi-santoso',
  },
  {
    id: '2',
    name: 'Pak Ahmad Rofiq',
    role: 'Patroli Lingkungan',
    status: 'bertugas',
    imageUrl: 'https://i.pravatar.cc/400?u=ahmad-rofiq',
  },
  {
    id: '3',
    name: 'Pak Heru Prayitno',
    role: 'Penjaga Gerbang Utama',
    status: 'istirahat',
    imageUrl: 'https://i.pravatar.cc/400?u=heru-prayitno',
  },
  {
    id: '4',
    name: 'Pak Dimas Wijaya',
    role: 'Monitor CCTV & IT',
    status: 'bertugas',
    imageUrl: 'https://i.pravatar.cc/400?u=dimas-wijaya',
  },
];

export const MOCK_SOP: SopItem[] = [
  { text: 'Patroli keliling dilakukan setiap 2 jam sekali pada area residensial.' },
  { text: 'Setiap tamu wajib melapor dan menitipkan identitas di gerbang utama.' },
  { text: 'Warga dapat meminta pengawalan khusus jika tiba di rumah larut malam.' },
];
