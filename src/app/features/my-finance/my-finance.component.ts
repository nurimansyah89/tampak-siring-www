import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { TableComponent, Column } from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MOCK_MY_FINANCE_SUMMARY, MOCK_PAYMENTS, PaymentRecord } from './my-finance.model';

@Component({
  selector: 'app-my-finance',
  imports: [MainLayoutComponent, StatCardComponent, TableComponent, ButtonComponent],
  templateUrl: './my-finance.component.html',
})
export class MyFinanceComponent {
  protected readonly summary = MOCK_MY_FINANCE_SUMMARY;
  protected readonly payments = MOCK_PAYMENTS;

  protected readonly columns: Column[] = [
    { key: 'month', header: 'Bulan/Tahun' },
    { key: 'date', header: 'Tanggal Bayar' },
    { key: 'method', header: 'Metode' },
    { key: 'amount', header: 'Jumlah', headerClass: 'text-right' },
    { key: 'status', header: 'Status' },
  ];

  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID').format(value);
  }
}
