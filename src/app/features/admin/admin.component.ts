import { Component, OnDestroy, afterNextRender, signal } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../shared/components/table/table.component';
import { MOCK_METRICS, MOCK_REVENUE, MOCK_ACTIVITIES, MOCK_PERSONNEL } from './admin.model';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  imports: [MainLayoutComponent, TableComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnDestroy {
  private chart: Chart | null = null;
  protected readonly chartReady = signal(false);

  constructor() {
    afterNextRender(() => {
      this.chartReady.set(true);
      requestAnimationFrame(() => this.initChart());
    });
  }

  protected readonly metrics = MOCK_METRICS;
  protected readonly revenue = MOCK_REVENUE;
  protected readonly activities = MOCK_ACTIVITIES;
  protected readonly personnel = MOCK_PERSONNEL;

  protected readonly columns: Column[] = [
    { key: 'name', header: 'Nama Personil' },
    { key: 'assignment', header: 'Penempatan' },
    { key: 'shift', header: 'Jam Jaga' },
    { key: 'status', header: 'Status' },
    { key: 'lastPatrol', header: 'Patroli Terakhir' },
  ];

  private initChart(): void {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.revenue.map((m) => m.month),
        datasets: [
          {
            label: 'Pendapatan',
            data: this.revenue.map((m) => m.revenue),
            backgroundColor: '#8b704f',
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
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y as number;
                if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)} jt`;
                if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)} rb`;
                return `Rp ${value}`;
              },
            },
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
}
