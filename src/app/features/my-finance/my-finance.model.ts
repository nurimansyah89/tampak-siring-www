export interface PaymentRecord {
  month: string;
  date: string;
  method: string;
  amount: number;
  status: 'LUNAS' | 'MENUNGGAK';
}

export interface MyFinanceSummary {
  totalPaid: number;
  outstanding: number;
  currentPeriod: string;
  dueDate: string;
  year: string;
}

export const MOCK_MY_FINANCE_SUMMARY: MyFinanceSummary = {
  totalPaid: 4200000,
  outstanding: 350000,
  currentPeriod: 'Desember 2023',
  dueDate: '10 Des 2023',
  year: '2023',
};

export const MOCK_PAYMENTS: PaymentRecord[] = [
  { month: 'Nov 2023', date: '05 Nov 2023', method: 'Transfer Bank (BCA)', amount: 350000, status: 'LUNAS' },
  { month: 'Okt 2023', date: '02 Okt 2023', method: 'E-Wallet (OVO)', amount: 350000, status: 'LUNAS' },
  { month: 'Sep 2023', date: '', method: '', amount: 350000, status: 'MENUNGGAK' },
  { month: 'Agt 2023', date: '12 Agt 2023', method: 'Virtual Account', amount: 350000, status: 'LUNAS' },
  { month: 'Jul 2023', date: '07 Jul 2023', method: 'Transfer Bank (BCA)', amount: 350000, status: 'LUNAS' },
  { month: 'Jun 2023', date: '10 Jun 2023', method: 'E-Wallet (DANA)', amount: 350000, status: 'LUNAS' },
  { month: 'Mei 2023', date: '01 Mei 2023', method: 'Transfer Bank (BCA)', amount: 350000, status: 'LUNAS' },
  { month: 'Apr 2023', date: '', method: '', amount: 350000, status: 'MENUNGGAK' },
  { month: 'Mar 2023', date: '15 Mar 2023', method: 'Virtual Account', amount: 350000, status: 'LUNAS' },
  { month: 'Feb 2023', date: '20 Feb 2023', method: 'Transfer Bank (BCA)', amount: 350000, status: 'LUNAS' },
  { month: 'Jan 2023', date: '03 Jan 2023', method: 'E-Wallet (OVO)', amount: 350000, status: 'LUNAS' },
];
