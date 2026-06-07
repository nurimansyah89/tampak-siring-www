import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DropdownComponent, DropdownItem } from '../../../shared/components/dropdown/dropdown.component';
import { FinanceTransaction, MOCK_FINANCE_SUMMARY, MOCK_FINANCE_TRANSACTIONS } from './finance.model';

@Component({
  selector: 'app-finance',
  imports: [MainLayoutComponent, TableComponent, PaginationComponent, DropdownComponent, FormsModule, RouterLink],
  templateUrl: './finance.component.html',
})
export class FinanceComponent {
  protected readonly summary = MOCK_FINANCE_SUMMARY;

  protected readonly allTransactions = signal<FinanceTransaction[]>(MOCK_FINANCE_TRANSACTIONS);
  protected readonly currentPage = signal<number>(1);
  protected readonly searchQuery = signal<string>('');
  protected readonly sortBy = signal<string>('residentName');
  protected readonly sortOrder = signal<'asc' | 'desc'>('asc');
  protected readonly pageSize = 10;

  protected readonly sortOptions: DropdownItem[] = [
    { label: 'Nama', value: 'residentName' },
    { label: 'Blok', value: 'block' },
    { label: 'Jumlah', value: 'amount' },
    { label: 'Status', value: 'status' },
  ];

  protected readonly filteredTransactions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allTransactions();
    return this.allTransactions().filter(
      (t) =>
        t.residentName.toLowerCase().includes(query) ||
        t.block.toLowerCase().includes(query),
    );
  });

  protected readonly sortedTransactions = computed(() => {
    const list = this.filteredTransactions();
    const field = this.sortBy();
    const order = this.sortOrder();
    return [...list].sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'residentName':
          cmp = a.residentName.localeCompare(b.residentName);
          break;
        case 'block':
          cmp = a.block.localeCompare(b.block);
          break;
        case 'amount':
          cmp = a.amount - b.amount;
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
      }
      return order === 'desc' ? -cmp : cmp;
    });
  });

  protected readonly displayedTransactions = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.sortedTransactions().slice(start, start + this.pageSize);
  });

  protected readonly columns: Column[] = [
    { key: 'residentName', header: 'Nama Penghuni' },
    { key: 'block', header: 'Blok' },
    { key: 'monthYear', header: 'Bulan/Tahun' },
    { key: 'amount', header: 'Jumlah' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Aksi', headerClass: 'text-right' },
  ];

  protected onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  protected onSortChange(value: string): void {
    if (this.sortBy() === value) {
      this.sortOrder.update((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortBy.set(value);
      const defaultOrders: Record<string, 'asc' | 'desc'> = {
        residentName: 'asc',
        block: 'asc',
        amount: 'desc',
        status: 'asc',
      };
      this.sortOrder.set(defaultOrders[value] ?? 'asc');
    }
    this.currentPage.set(1);
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected formatAmount(amount: number): string {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }

  protected getStatusClass(status: string): string {
    switch (status) {
      case 'Lunas':
        return 'bg-green-100 text-green-700';
      case 'Belum Dibayar':
        return 'bg-yellow-100 text-yellow-700';
      case 'Terlambat':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  }
}
