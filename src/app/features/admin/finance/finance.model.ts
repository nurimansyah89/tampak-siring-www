export interface FinanceTransaction {
  id: string;
  residentName: string;
  initials: string;
  block: string;
  monthYear: string;
  amount: number;
  status: 'Lunas' | 'Belum Dibayar' | 'Terlambat';
}

export interface FinanceSummary {
  totalCollected: number;
  totalCollectedPercentage: number;
  badgeText: string;
  outstandingAmount: number;
  outstandingUnits: number;
  averageDelay: number;
}

export const MOCK_FINANCE_SUMMARY: FinanceSummary = {
  totalCollected: 42850000,
  totalCollectedPercentage: 89,
  badgeText: '+12,5% vs Bulan Lalu',
  outstandingAmount: 5120000,
  outstandingUnits: 14,
  averageDelay: 4,
};

export interface PaymentDetail {
  id: string;
  transactionId: string;
  residentName: string;
  residentType: string;
  initials: string;
  block: string;
  period: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  proofImageUrl: string;
  status: 'Terverifikasi' | 'Menunggu' | 'Ditolak';
}

export const MOCK_PAYMENT_DETAILS: PaymentDetail[] = [
  {
    id: '1',
    transactionId: '#PAY-20231015-0842',
    residentName: 'Bambang Pamungkas',
    residentType: 'Penghuni Tetap',
    initials: 'BP',
    block: 'Blok A - 12',
    period: 'Oktober 2023',
    amount: 350000,
    paymentMethod: 'Transfer Bank',
    paymentDate: '15 Okt 2023, 08:30',
    proofImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0XeqrA0Y771SENDzwqFn04UwYm8ylBslw81Z9Q9jqG7W9tqWW1PXPbSY9r5OxbOd23FHWZb7gGHbJDIKkY5xAl4s5N6CalEPcUuldP5s4eIiUC324hYd8h0CHyPK8BVWoR-o_nrIKe3q4cf0WD1WAQifTUjUgHzCyXt0zH8KJo5rH9dK-hyYf_9qPTE1aKQ_nSnl_eK6q7uXrgqwdX6hkMzRY97g30fy2pUWi37k4JHEp8g-WpYbohoTjCbPm3LN1ThEEVjeIct0',
    status: 'Menunggu',
  },
  {
    id: '4',
    transactionId: '#PAY-20231014-0921',
    residentName: 'Siti Nurhaliza',
    residentType: 'Penghuni Tetap',
    initials: 'SN',
    block: 'Blok A - 01',
    period: 'Oktober 2023',
    amount: 350000,
    paymentMethod: 'E-Wallet',
    paymentDate: '14 Okt 2023, 09:21',
    proofImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0XeqrA0Y771SENDzwqFn04UwYm8ylBslw81Z9Q9jqG7W9tqWW1PXPbSY9r5OxbOd23FHWZb7gGHbJDIKkY5xAl4s5N6CalEPcUuldP5s4eIiUC324hYd8h0CHyPK8BVWoR-o_nrIKe3q4cf0WD1WAQifTUjUgHzCyXt0zH8KJo5rH9dK-hyYf_9qPTE1aKQ_nSnl_eK6q7uXrgqwdX6hkMzRY97g30fy2pUWi37k4JHEp8g-WpYbohoTjCbPm3LN1ThEEVjeIct0',
    status: 'Terverifikasi',
  },
  {
    id: '6',
    transactionId: '#PAY-20231013-1145',
    residentName: 'Maya Indah',
    residentType: 'Penghuni Tetap',
    initials: 'MI',
    block: 'Blok A - 21',
    period: 'Oktober 2023',
    amount: 350000,
    paymentMethod: 'Tunai',
    paymentDate: '13 Okt 2023, 11:45',
    proofImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0XeqrA0Y771SENDzwqFn04UwYm8ylBslw81Z9Q9jqG7W9tqWW1PXPbSY9r5OxbOd23FHWZb7gGHbJDIKkY5xAl4s5N6CalEPcUuldP5s4eIiUC324hYd8h0CHyPK8BVWoR-o_nrIKe3q4cf0WD1WAQifTUjUgHzCyXt0zH8KJo5rH9dK-hyYf_9qPTE1aKQ_nSnl_eK6q7uXrgqwdX6hkMzRY97g30fy2pUWi37k4JHEp8g-WpYbohoTjCbPm3LN1ThEEVjeIct0',
    status: 'Ditolak',
  },
];

export const MOCK_FINANCE_TRANSACTIONS: FinanceTransaction[] = [
  { id: '1', residentName: 'Bambang Pamungkas', initials: 'BP', block: 'Blok A - 12', monthYear: 'Okt 2023', amount: 350000, status: 'Lunas' },
  { id: '2', residentName: 'Dewi Anggraini', initials: 'DA', block: 'Blok C - 05', monthYear: 'Okt 2023', amount: 350000, status: 'Belum Dibayar' },
  { id: '3', residentName: 'Raka Jatmika', initials: 'RJ', block: 'Blok B - 21', monthYear: 'Sep 2023', amount: 700000, status: 'Terlambat' },
  { id: '4', residentName: 'Siti Nurhaliza', initials: 'SN', block: 'Blok A - 01', monthYear: 'Okt 2023', amount: 350000, status: 'Lunas' },
  { id: '5', residentName: 'Andi Saputra', initials: 'AS', block: 'Blok D - 15', monthYear: 'Okt 2023', amount: 350000, status: 'Belum Dibayar' },
  { id: '6', residentName: 'Maya Indah', initials: 'MI', block: 'Blok A - 21', monthYear: 'Okt 2023', amount: 350000, status: 'Lunas' },
  { id: '7', residentName: 'Eko Putra', initials: 'EP', block: 'Blok C - 09', monthYear: 'Sep 2023', amount: 350000, status: 'Terlambat' },
  { id: '8', residentName: 'Agus Pratama', initials: 'AP', block: 'Blok D - 03', monthYear: 'Okt 2023', amount: 350000, status: 'Belum Dibayar' },
  { id: '9', residentName: 'Rina Marlina', initials: 'RM', block: 'Blok B - 14', monthYear: 'Okt 2023', amount: 350000, status: 'Lunas' },
  { id: '10', residentName: 'Hadi Wijaya', initials: 'HW', block: 'Blok C - 07', monthYear: 'Sep 2023', amount: 700000, status: 'Terlambat' },
  { id: '11', residentName: 'Siti Aminah', initials: 'SA', block: 'Blok B - 11', monthYear: 'Okt 2023', amount: 350000, status: 'Lunas' },
  { id: '12', residentName: 'Dewi Sartika', initials: 'DS', block: 'Blok A - 19', monthYear: 'Okt 2023', amount: 350000, status: 'Belum Dibayar' },
];
