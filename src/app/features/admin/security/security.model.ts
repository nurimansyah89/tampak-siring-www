export interface SecurityPersonnel {
  id: string;
  name: string;
  initials: string;
  contact: string;
  position: string;
  status: 'Aktif' | 'Absen' | 'Cuti' | 'Tugas Luar';
}

export interface SystemStatus {
  label: string;
  message: string;
  badge: string;
  status: 'secure' | 'warning' | 'danger';
}

export interface GuardOnDuty {
  name: string;
  position: string;
  initials: string;
}

export const MOCK_SYSTEM_STATUS: SystemStatus = {
  label: 'Status Sistem',
  badge: 'Aman',
  message: 'Seluruh sistem gerbang otomatis, CCTV, dan sensor dalam kondisi normal. Patroli terakhir selesai 12 menit yang lalu oleh Unit 2.',
  status: 'secure',
};

export const MOCK_GUARD_ON_DUTY: GuardOnDuty = {
  name: 'Marcus V.',
  position: 'Supervisor Patroli Senior',
  initials: 'MV',
};

export const MOCK_SECURITY_PERSONNEL: SecurityPersonnel[] = [
  { id: '1', name: 'Marcus V.', initials: 'MV', contact: 'Ext. 401', position: 'Supervisor Patroli Senior', status: 'Aktif' },
  { id: '2', name: 'Sarah L.', initials: 'SL', contact: 'Ext. 405', position: 'Petugas Keamanan', status: 'Absen' },
  { id: '3', name: 'Bambang P.', initials: 'BP', contact: 'Ext. 402', position: 'Petugas Keamanan', status: 'Aktif' },
  { id: '4', name: 'Dewi A.', initials: 'DA', contact: 'Ext. 403', position: 'Operator CCTV', status: 'Aktif' },
  { id: '5', name: 'Raka J.', initials: 'RJ', contact: 'Ext. 406', position: 'Petugas Patroli', status: 'Cuti' },
  { id: '6', name: 'Siti N.', initials: 'SN', contact: 'Ext. 404', position: 'Resepsionis Keamanan', status: 'Aktif' },
  { id: '7', name: 'Andi S.', initials: 'AS', contact: 'Ext. 407', position: 'Petugas Keamanan', status: 'Tugas Luar' },
  { id: '8', name: 'Maya I.', initials: 'MI', contact: 'Ext. 408', position: 'Operator CCTV', status: 'Aktif' },
  { id: '9', name: 'Eko P.', initials: 'EP', contact: 'Ext. 409', position: 'Petugas Patroli', status: 'Aktif' },
  { id: '10', name: 'Agus P.', initials: 'AP', contact: 'Ext. 410', position: 'Petugas Keamanan', status: 'Absen' },
  { id: '11', name: 'Rina M.', initials: 'RM', contact: 'Ext. 411', position: 'Resepsionis Keamanan', status: 'Aktif' },
  { id: '12', name: 'Hadi W.', initials: 'HW', contact: 'Ext. 412', position: 'Petugas Patroli', status: 'Aktif' },
];
