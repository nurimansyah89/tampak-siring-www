import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DropdownComponent, DropdownItem } from '../../../shared/components/dropdown/dropdown.component';
import { NewsItem, MOCK_NEWS, MOCK_TOTAL_VIEWS } from './news.model';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-news',
  imports: [
    MainLayoutComponent,
    TableComponent,
    PaginationComponent,
    DropdownComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './news.component.html',
})
export class NewsComponent {
  protected readonly allNews = signal<NewsItem[]>(MOCK_NEWS);
  protected readonly searchQuery = signal<string>('');
  protected readonly currentPage = signal<number>(1);
  protected readonly sortBy = signal<string>('date');
  protected readonly sortOrder = signal<'asc' | 'desc'>('desc');

  protected readonly sortOptions: DropdownItem[] = [
    { label: 'Tanggal', value: 'date' },
    { label: 'Judul', value: 'title' },
    { label: 'Kategori', value: 'category' },
    { label: 'Status', value: 'status' },
    { label: 'Dilihat', value: 'views' },
  ];

  protected readonly pageSize = PAGE_SIZE;

  protected readonly stats = computed(() => {
    const list = this.allNews();
    return {
      totalActive: list.filter((n) => n.status === 'Aktif').length,
      totalInactive: list.filter((n) => n.status === 'Non-Aktif').length,
      totalViews: MOCK_TOTAL_VIEWS,
    };
  });

  protected readonly columns: Column[] = [
    { key: 'thumbnail', header: 'Thumbnail' },
    { key: 'title', header: 'Judul & Deskripsi' },
    { key: 'category', header: 'Kategori' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Aksi', headerClass: 'text-right' },
  ];

  protected readonly filteredNews = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allNews();
    return this.allNews().filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        n.description.toLowerCase().includes(query) ||
        n.category.toLowerCase().includes(query),
    );
  });

  protected readonly sortedNews = computed(() => {
    const list = this.filteredNews();
    const field = this.sortBy();
    const order = this.sortOrder();
    return [...list].sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'date':
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'title':
          cmp = a.title.localeCompare(b.title);
          break;
        case 'category':
          cmp = a.category.localeCompare(b.category);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
        case 'views':
          cmp = a.views - b.views;
          break;
      }
      return order === 'desc' ? -cmp : cmp;
    });
  });

  protected readonly displayedNews = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.sortedNews().slice(start, start + PAGE_SIZE);
  });

  protected onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected onSortChange(value: string): void {
    if (this.sortBy() === value) {
      this.sortOrder.update((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortBy.set(value);
      const defaultOrders: Record<string, 'asc' | 'desc'> = {
        date: 'desc',
        title: 'asc',
        category: 'asc',
        status: 'asc',
        views: 'desc',
      };
      this.sortOrder.set(defaultOrders[value] ?? 'asc');
    }
    this.currentPage.set(1);
  }

  protected getStatusClass(status: string): string {
    return status === 'Aktif'
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-surface-container text-on-surface-variant border-outline-variant';
  }

  protected getCategoryClass(category: string): string {
    return category === 'Berita'
      ? 'bg-primary/10 text-primary'
      : 'bg-tertiary/10 text-tertiary';
  }

  protected onDelete(id: string): void {
    const confirm = window.confirm('Hapus berita/pengumuman ini?');
    if (!confirm) return;
    this.allNews.update((list) => list.filter((n) => n.id !== id));
  }
}
