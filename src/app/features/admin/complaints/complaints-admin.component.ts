import { Component, OnDestroy, afterNextRender, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ComplaintAdmin, MOCK_COMPLAINTS_ADMIN, Category, CATEGORIES } from './complaints-admin.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PAGE_SIZE = 5;

@Component({
  selector: 'app-complaints-admin',
  imports: [MainLayoutComponent, TableComponent, PaginationComponent, RouterLink],
  templateUrl: './complaints-admin.component.html',
})
export class ComplaintsAdminComponent implements OnDestroy {
  private chart: Chart | null = null;
  protected readonly chartReady = signal(false);

  constructor() {
    afterNextRender(() => {
      this.chartReady.set(true);
      const tryInit = () => {
        const canvas = document.getElementById('trendChart') as HTMLCanvasElement;
        if (!canvas || !canvas.parentElement) {
          requestAnimationFrame(tryInit);
          return;
        }
        const parent = canvas.parentElement;
        const h = parent.clientHeight;
        if (h > 0) {
          canvas.width = parent.clientWidth;
          canvas.height = h;
          this.initChart();
        } else {
          requestAnimationFrame(tryInit);
        }
      };
      requestAnimationFrame(tryInit);
    });
  }

  protected readonly allComplaints = signal<ComplaintAdmin[]>(MOCK_COMPLAINTS_ADMIN);
  protected readonly activeCategory = signal<Category | 'Semua'>('Semua');
  protected readonly currentPage = signal<number>(1);

  protected readonly categories = signal<('Semua' | Category)[]>(['Semua', ...CATEGORIES]);

  protected readonly stats = computed(() => {
    const all = this.allComplaints();
    return {
      open: all.filter((c) => c.status !== 'Selesai').length,
      openTrend: '+12%',
      openTrendUp: true,
      openProgress: Math.round((all.filter((c) => c.status !== 'Selesai').length / all.length) * 100),
    };
  });

  protected readonly filteredComplaints = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'Semua') return this.allComplaints();
    return this.allComplaints().filter((c) => c.category === cat);
  });

  protected readonly sortedComplaints = computed(() =>
    [...this.filteredComplaints()].sort((a, b) => {
      const priorityOrder: Record<string, number> = { Mendesak: 3, Tinggi: 2, Normal: 1 };
      return (priorityOrder[b.priority] ?? 0) - (priorityOrder[a.priority] ?? 0);
    }),
  );

  protected readonly displayedComplaints = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.sortedComplaints().slice(start, start + PAGE_SIZE);
  });

  protected readonly columns: Column[] = [
    { key: 'ticket', header: 'Tiket' },
    { key: 'resident', header: 'Warga' },
    { key: 'priority', header: 'Prioritas', headerClass: 'text-center' },
    { key: 'status', header: 'Status', headerClass: 'text-center' },
    { key: 'actions', header: 'Aksi', headerClass: 'text-right' },
  ];

  protected readonly chartLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  protected readonly chartData = [4, 7, 3, 2, 5, 1, 3];

  private initChart(): void {
    const canvas = document.getElementById('trendChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Aduan',
            data: this.chartData,
            backgroundColor: [
              '#d1c4b8',
              '#d1c4b8',
              '#d1c4b8',
              '#d1c4b8',
              '#d1c4b8',
              '#d1c4b8',
              '#8b704f',
            ],
            borderRadius: 4,
            barPercentage: 0.65,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#2b1613',
            titleFont: { family: 'Nunito', size: 12, weight: 'bold' },
            bodyFont: { family: 'Nunito', size: 13 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.parsed.y} aduan`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Nunito', size: 12 },
              color: '#4e453c',
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: '#d1c4b8' },
            ticks: {
              font: { family: 'Nunito', size: 12 },
              color: '#4e453c',
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  protected onCategoryChange(category: 'Semua' | Category): void {
    this.activeCategory.set(category);
    this.currentPage.set(1);
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Mendesak': return 'bg-error/10 text-error';
      case 'Tinggi': return 'bg-tertiary/10 text-tertiary';
      case 'Normal': return 'bg-secondary/10 text-secondary';
      default: return 'bg-secondary/10 text-secondary';
    }
  }

  protected getPriorityDot(priority: string): string {
    switch (priority) {
      case 'Mendesak': return 'bg-error';
      case 'Tinggi': return 'bg-tertiary';
      case 'Normal': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  protected getStatusClass(status: string): string {
    switch (status) {
      case 'Baru': return 'bg-tertiary/10 text-tertiary border border-tertiary/20';
      case 'Diproses': return 'bg-primary/10 text-primary border border-primary/20';
      case 'Selesai': return 'bg-green-100 text-green-700 border border-green-200';
      default: return 'bg-secondary/10 text-secondary border border-secondary/20';
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
