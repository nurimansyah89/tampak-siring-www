export interface AdminMetric {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  trendIcon?: string;
  trendValue?: string;
  trendColor?: string;
  progressPercent: number;
  progressColor: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface RecentActivity {
  dotColor: string;
  title: string;
  description: string;
  time: string;
}

export interface SecurityPersonnel {
  initials: string;
  name: string;
  assignment: string;
  shift: string;
  status: string;
  statusClass: string;
  statusTextClass: string;
  lastPatrol: string;
}

export const MOCK_METRICS: AdminMetric[] = [
  {
    icon: 'group',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    label: 'Total Warga',
    value: '1.422',
    trendIcon: 'trending_up',
    trendValue: '+12',
    trendColor: 'text-green-600',
    progressPercent: 85,
    progressColor: 'bg-primary',
  },
  {
    icon: 'payments',
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
    label: 'Pendapatan Bulanan',
    value: 'Rp 482,5jt',
    trendIcon: 'trending_up',
    trendValue: '4,2%',
    trendColor: 'text-green-600',
    progressPercent: 92,
    progressColor: 'bg-tertiary',
  },
  {
    icon: 'emergency_home',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    label: 'Aduan Aktif',
    value: '24',
    trendIcon: 'warning',
    trendValue: 'Tinggi',
    trendColor: 'text-error',
    progressPercent: 24,
    progressColor: 'bg-error',
  },
  {
    icon: 'security',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    label: 'Status Keamanan',
    value: 'Stabil',
    trendValue: 'Optimal',
    trendColor: 'bg-green-100 text-green-700',
    progressPercent: 100,
    progressColor: 'bg-secondary',
  },
];

export const MOCK_REVENUE: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 28400000 },
  { month: 'Feb', revenue: 32000000 },
  { month: 'Mar', revenue: 25600000 },
  { month: 'Apr', revenue: 38400000 },
  { month: 'Mei', revenue: 29600000 },
  { month: 'Jun', revenue: 48250000 },
];

export const MOCK_ACTIVITIES: RecentActivity[] = [
  {
    dotColor: 'bg-green-500',
    title: 'Pembayaran Rumah B-12',
    description: 'Iuran bulanan berhasil dibayarkan',
    time: '10 menit yang lalu',
  },
  {
    dotColor: 'bg-error',
    title: 'Aduan Baru Masuk',
    description: 'Lampu jalan rusak di Sektor 4',
    time: '2 jam yang lalu',
  },
  {
    dotColor: 'bg-primary',
    title: 'Akses Tamu Disetujui',
    description: 'Pengunjung untuk Rumah A-05 masuk',
    time: '4 jam yang lalu',
  },
];

export const MOCK_PERSONNEL: SecurityPersonnel[] = [
  {
    initials: 'AM',
    name: 'Agus Maulana',
    assignment: 'Gerbang Utama',
    shift: '08:00 - 16:00',
    status: 'Aktif',
    statusClass: 'bg-green-100',
    statusTextClass: 'text-green-700',
    lastPatrol: '14:45 (Pos 4)',
  },
  {
    initials: 'BP',
    name: 'Bambang Pamungkas',
    assignment: 'Patroli Mobile (Motor)',
    shift: '08:00 - 16:00',
    status: 'Aktif',
    statusClass: 'bg-green-100',
    statusTextClass: 'text-green-700',
    lastPatrol: '15:02 (Sektor 7)',
  },
  {
    initials: 'SK',
    name: 'Siti Khadijah',
    assignment: 'Pusat Komando',
    shift: '08:00 - 16:00',
    status: 'Istirahat',
    statusClass: 'bg-tertiary-fixed-dim',
    statusTextClass: 'text-on-tertiary-fixed-variant',
    lastPatrol: 'Monitor Sistem',
  },
];
