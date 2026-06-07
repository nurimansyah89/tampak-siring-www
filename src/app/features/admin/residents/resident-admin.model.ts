export interface ResidentAdmin {
  id: string;
  name: string;
  email: string;
  initials: string;
  block: string;
  phone: string;
  status: 'Aktif' | 'Tidak Aktif' | 'Tertunda';
}

export const MOCK_RESIDENT_ADMINS: ResidentAdmin[] = [
  { id: '1', name: 'John Doe', email: 'johndoe@email.com', initials: 'JD', block: 'Blok A, No. 12', phone: '+62 812-3456-7890', status: 'Aktif' },
  { id: '2', name: 'Alice Smith', email: 'alice.s@email.com', initials: 'AS', block: 'Blok B, No. 05', phone: '+62 813-9876-5432', status: 'Aktif' },
  { id: '3', name: 'Robert Junior', email: 'robert.jr@email.com', initials: 'RJ', block: 'Blok C, No. 22', phone: '+62 856-7890-1234', status: 'Tidak Aktif' },
  { id: '4', name: 'Maria Kim', email: 'm.kim@email.com', initials: 'MK', block: 'Blok A, No. 01', phone: '+62 811-2233-4455', status: 'Aktif' },
  { id: '5', name: 'Bambang Susilo', email: 'bambang@email.com', initials: 'BS', block: 'Blok D, No. 08', phone: '+62 817-6543-2100', status: 'Aktif' },
  { id: '6', name: 'Siti Aminah', email: 'siti.a@email.com', initials: 'SA', block: 'Blok B, No. 11', phone: '+62 813-1122-3344', status: 'Tertunda' },
  { id: '7', name: 'Hadi Wijaya', email: 'hadi.w@email.com', initials: 'HW', block: 'Blok C, No. 07', phone: '+62 856-5566-7788', status: 'Aktif' },
  { id: '8', name: 'Dewi Sartika', email: 'dewi@email.com', initials: 'DS', block: 'Blok A, No. 19', phone: '+62 812-9988-7766', status: 'Tidak Aktif' },
  { id: '9', name: 'Agus Pratama', email: 'agus.p@email.com', initials: 'AP', block: 'Blok D, No. 03', phone: '+62 811-4455-6677', status: 'Aktif' },
  { id: '10', name: 'Rina Marlina', email: 'rina@email.com', initials: 'RM', block: 'Blok B, No. 14', phone: '+62 813-2233-4455', status: 'Tertunda' },
  { id: '11', name: 'Eko Putra', email: 'eko.p@email.com', initials: 'EP', block: 'Blok C, No. 09', phone: '+62 856-7788-9900', status: 'Aktif' },
  { id: '12', name: 'Maya Indah', email: 'maya.i@email.com', initials: 'MI', block: 'Blok A, No. 21', phone: '+62 812-3344-5566', status: 'Aktif' },
];
