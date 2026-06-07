import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DropdownComponent, DropdownItem } from '../../../shared/components/dropdown/dropdown.component';
import { ResidentAdmin, MOCK_RESIDENT_ADMINS } from './resident-admin.model';

@Component({
  selector: 'app-resident-admin',
  imports: [MainLayoutComponent, TableComponent, PaginationComponent, DropdownComponent, FormsModule, RouterLink],
  templateUrl: './resident-admin.component.html',
})
export class ResidentAdminComponent {
  protected readonly allResidents = signal<ResidentAdmin[]>(MOCK_RESIDENT_ADMINS);
  protected readonly currentPage = signal<number>(1);
  protected readonly searchQuery = signal<string>('');
  protected readonly sortBy = signal<string>('name');
  protected readonly sortOrder = signal<'asc' | 'desc'>('asc');
  protected readonly pageSize = 10;

  protected readonly sortOptions: DropdownItem[] = [
    { label: 'Nama', value: 'name' },
    { label: 'Blok Rumah', value: 'block' },
    { label: 'Status', value: 'status' },
  ];

  protected readonly filteredResidents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allResidents();
    return this.allResidents().filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.block.toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query),
    );
  });

  protected readonly sortedResidents = computed(() => {
    const list = this.filteredResidents();
    const field = this.sortBy();
    const order = this.sortOrder();
    return [...list].sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'block':
          cmp = a.block.localeCompare(b.block);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
      }
      return order === 'desc' ? -cmp : cmp;
    });
  });

  protected readonly displayedResidents = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.sortedResidents().slice(start, start + this.pageSize);
  });

  protected readonly totalStats = computed(() => {
    const all = this.allResidents();
    return {
      total: all.length,
      active: all.filter((r) => r.status === 'Aktif').length,
      inactive: all.filter((r) => r.status === 'Tidak Aktif').length,
      pending: all.filter((r) => r.status === 'Tertunda').length,
    };
  });

  protected readonly columns: Column[] = [
    { key: 'name', header: 'Nama' },
    { key: 'block', header: 'Blok Rumah' },
    { key: 'phone', header: 'Nomor Telepon' },
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
        name: 'asc',
        block: 'asc',
        status: 'asc',
      };
      this.sortOrder.set(defaultOrders[value] ?? 'asc');
    }
    this.currentPage.set(1);
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected getStatusClass(status: string): string {
    switch (status) {
      case 'Aktif':
        return 'bg-green-100 text-green-700';
      case 'Tidak Aktif':
        return 'bg-orange-100 text-orange-700';
      case 'Tertunda':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  }
}
