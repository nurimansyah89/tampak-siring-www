import { Component, OnDestroy, afterNextRender, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../shared/components/table/table.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import {
  Transaction,
  MOCK_TRANSACTIONS,
  MOCK_CASH_FLOW,
  MOCK_SUMMARY,
  MonthlyCashFlow,
} from './finance.model';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-finance',
  imports: [MainLayoutComponent, TableComponent, AlertComponent, FormsModule],
  templateUrl: './finance.component.html',
})
export class FinanceComponent implements OnDestroy {
  private chart: Chart | null = null;
  protected readonly chartReady = signal(false);

  constructor() {
    afterNextRender(() => {
      this.chartReady.set(true);
      requestAnimationFrame(() => this.initChart());
    });
  }

  protected readonly summary = MOCK_SUMMARY;
  protected readonly cashFlow = MOCK_CASH_FLOW;

  protected readonly allTransactions = signal<Transaction[]>(MOCK_TRANSACTIONS);
  protected readonly searchQuery = signal('');
  protected readonly isSearching = signal(false);
  protected readonly showAll = signal(false);
  protected readonly isLoadingAll = signal(false);

  protected readonly filteredTransactions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    let transactions = this.allTransactions();
    if (query) {
      transactions = transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.ref.toLowerCase().includes(query) ||
          t.date.toLowerCase().includes(query),
      );
    }
    if (!this.showAll() && !query) {
      transactions = transactions.slice(0, 5);
    }
    return transactions;
  });

  protected readonly columns: Column[] = [
    { key: 'date', header: 'Tanggal' },
    { key: 'description', header: 'Keterangan Transaksi' },
    { key: 'type', header: 'Tipe' },
    { key: 'nominal', header: 'Nominal', headerClass: 'text-right' },
  ];

  protected readonly maxCashFlow = computed(() => {
    return Math.max(...this.cashFlow.flatMap((m) => [m.pemasukan, m.pengeluaran]));
  });

  protected onSearchInput(value: string): void {
    this.isSearching.set(true);
    this.searchQuery.set(value);
    setTimeout(() => this.isSearching.set(false), 600);
  }

  protected onShowAll(): void {
    this.isLoadingAll.set(true);
    setTimeout(() => {
      this.showAll.set(true);
      this.isLoadingAll.set(false);
    }, 800);
  }

  private initChart(): void {
    const canvas = document.getElementById('cashflowChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.cashFlow.map((m) => m.month),
        datasets: [
          {
            label: 'Pemasukan',
            data: this.cashFlow.map((m) => m.pemasukan),
            backgroundColor: '#8b704f',
            borderRadius: 4,
            barPercentage: 0.6,
          },
          {
            label: 'Pengeluaran',
            data: this.cashFlow.map((m) => m.pengeluaran),
            backgroundColor: '#d1c4b8',
            borderRadius: 4,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: 'Nunito',
                size: 12,
              },
              color: '#4e453c',
            },
          },
          y: {
            grid: {
              color: '#d1c4b8',
            },
            ticks: {
              font: {
                family: 'Nunito',
                size: 12,
              },
              color: '#4e453c',
              callback: (value: any) => {
                if (typeof value === 'number') {
                  if (value >= 1000000) return `Rp${(value / 1000000).toFixed(0)}jt`;
                  if (value >= 1000) return `Rp${(value / 1000).toFixed(0)}rb`;
                }
                return `Rp${value}`;
              },
            },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  protected formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
