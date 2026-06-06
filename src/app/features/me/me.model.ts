export interface ProfileData {
  name: string;
  phone: string;
  email: string;
  address: string;
  residentId: string;
  block: string;
  paymentStatus: string;
  verificationStatus: string;
}

export const MOCK_PROFILE: ProfileData = {
  name: 'Andi Wijaya',
  phone: '+62 812 3456 7890',
  email: 'andi.wijaya@email.com',
  address: 'Jalan Tampaksiring Raya No. 12, Blok A-12, Smart Cluster Residential, Jakarta Timur',
  residentId: 'TSC-2024-089',
  block: 'Blok A-12',
  paymentStatus: 'Lunas',
  verificationStatus: 'Terverifikasi',
};
