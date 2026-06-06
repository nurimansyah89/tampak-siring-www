export interface Resident {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  address: string;
}

export interface FamilyMember {
  name: string;
  relation: string;
}

export interface Pet {
  name: string;
  type: string;
}

export interface ResidentDetail extends Resident {
  pets: Pet[];
  familyMembers: FamilyMember[];
}

export const MOCK_RESIDENTS: Resident[] = [
  { id: 'Y03-01', name: 'Bambang Susilo', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok A No. 12, Cluster Utama' },
  { id: 'Y03-03', name: 'Siti Aminah', role: 'Pemilik Unit', photoUrl: '', address: 'Blok B No. 05, Cluster Selatan' },
  { id: 'Y03-05', name: 'Hadi Wijaya', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok C No. 22, Cluster Barat' },
  { id: 'Y03-07', name: 'Dewi Sartika', role: 'Pemilik Unit', photoUrl: '', address: 'Blok A No. 08, Cluster Utama' },
  { id: 'Y03-09', name: 'Agus Pratama', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok D No. 15, Cluster Timur' },
  { id: 'Y03-11', name: 'Rina Marlina', role: 'Pemilik Unit', photoUrl: '', address: 'Blok B No. 11, Cluster Selatan' },
  { id: '7', name: 'Eko Putra', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok C No. 07, Cluster Barat' },
  { id: '8', name: 'Maya Indah', role: 'Pemilik Unit', photoUrl: '', address: 'Blok A No. 19, Cluster Utama' },
  { id: '9', name: 'Doni Firmansyah', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok D No. 03, Cluster Timur' },
  { id: '10', name: 'Nina Rahmawati', role: 'Pemilik Unit', photoUrl: '', address: 'Blok B No. 14, Cluster Selatan' },
  { id: '11', name: 'Rudi Hartono', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok C No. 09, Cluster Barat' },
  { id: '12', name: 'Fitriani', role: 'Pemilik Unit', photoUrl: '', address: 'Blok A No. 21, Cluster Utama' },
];

export const MOCK_RESIDENT_DETAILS: ResidentDetail[] = [
  {
    id: 'Y03-01', name: 'Bambang Susilo', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok A No. 12, Cluster Utama',
    pets: [
      { name: 'Si Putih', type: 'Kucing Persian' },
    ],
    familyMembers: [
      { name: 'Siti Aminah', relation: 'Istri' },
      { name: 'Rian Susilo', relation: 'Anak Pertama' },
      { name: 'Maya Susilo', relation: 'Anak Kedua' },
      { name: 'Kartono', relation: 'Orang Tua' },
    ],
  },
  {
    id: 'Y03-03', name: 'Siti Aminah', role: 'Pemilik Unit', photoUrl: '', address: 'Blok B No. 05, Cluster Selatan',
    pets: [],
    familyMembers: [
      { name: 'Ahmad Fauzi', relation: 'Suami' },
      { name: 'Naura Fauzi', relation: 'Anak' },
    ],
  },
  {
    id: 'Y03-05', name: 'Hadi Wijaya', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok C No. 22, Cluster Barat',
    pets: [
      { name: 'Brownie', type: 'Anjing Pomeranian' },
      { name: 'Kuro', type: 'Kucing Anggora' },
    ],
    familyMembers: [
      { name: 'Dian Wijaya', relation: 'Istri' },
      { name: 'Bima Wijaya', relation: 'Anak' },
    ],
  },
  {
    id: 'Y03-07', name: 'Dewi Sartika', role: 'Pemilik Unit', photoUrl: '', address: 'Blok A No. 08, Cluster Utama',
    pets: [
      { name: 'Milo', type: 'Hamster' },
    ],
    familyMembers: [
      { name: 'Gilang Ramadan', relation: 'Suami' },
    ],
  },
  {
    id: 'Y03-09', name: 'Agus Pratama', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok D No. 15, Cluster Timur',
    pets: [],
    familyMembers: [
      { name: 'Rini Pratama', relation: 'Istri' },
      { name: 'Adi Pratama', relation: 'Anak Pertama' },
      { name: 'Sari Pratama', relation: 'Anak Kedua' },
    ],
  },
  {
    id: 'Y03-11', name: 'Rina Marlina', role: 'Pemilik Unit', photoUrl: '', address: 'Blok B No. 11, Cluster Selatan',
    pets: [
      { name: 'Charlie', type: 'Kucing Maine Coon' },
    ],
    familyMembers: [
      { name: 'Doni Marlina', relation: 'Suami' },
      { name: 'Kiki Marlina', relation: 'Anak' },
    ],
  },
  {
    id: '7', name: 'Eko Putra', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok C No. 07, Cluster Barat',
    pets: [
      { name: 'Rex', type: 'Anjing German Shepherd' },
    ],
    familyMembers: [
      { name: 'Wulan Putra', relation: 'Istri' },
      { name: 'Dito Putra', relation: 'Anak Pertama' },
      { name: 'Rara Putra', relation: 'Anak Kedua' },
      { name: 'Sumini', relation: 'Orang Tua' },
    ],
  },
  {
    id: '8', name: 'Maya Indah', role: 'Pemilik Unit', photoUrl: '', address: 'Blok A No. 19, Cluster Utama',
    pets: [],
    familyMembers: [
      { name: 'Andi Indah', relation: 'Suami' },
    ],
  },
  {
    id: '9', name: 'Doni Firmansyah', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok D No. 03, Cluster Timur',
    pets: [
      { name: 'Luna', type: 'Kucing Sphynx' },
      { name: 'Bobby', type: 'Anjing Bulldog' },
    ],
    familyMembers: [
      { name: 'Sari Firmansyah', relation: 'Istri' },
      { name: 'Dika Firmansyah', relation: 'Anak Pertama' },
    ],
  },
  {
    id: '10', name: 'Nina Rahmawati', role: 'Pemilik Unit', photoUrl: '', address: 'Blok B No. 14, Cluster Selatan',
    pets: [],
    familyMembers: [
      { name: 'Fajar Rahmawati', relation: 'Suami' },
      { name: 'Cinta Rahmawati', relation: 'Anak' },
      { name: 'Sari Rahmawati', relation: 'Anak' },
    ],
  },
  {
    id: '11', name: 'Rudi Hartono', role: 'Kepala Keluarga', photoUrl: '', address: 'Blok C No. 09, Cluster Barat',
    pets: [
      { name: 'Mochi', type: 'Kucing Ragdoll' },
    ],
    familyMembers: [
      { name: 'Dewi Hartono', relation: 'Istri' },
      { name: 'Fahri Hartono', relation: 'Anak' },
      { name: 'Nindi Hartono', relation: 'Anak' },
      { name: 'Supardi', relation: 'Orang Tua' },
    ],
  },
  {
    id: '12', name: 'Fitriani', role: 'Pemilik Unit', photoUrl: '', address: 'Blok A No. 21, Cluster Utama',
    pets: [
      { name: 'Oreo', type: 'Kucing Persia' },
      { name: 'Bonbon', type: 'Kelinci' },
    ],
    familyMembers: [
      { name: 'Rizki Fitriani', relation: 'Suami' },
    ],
  },
];
