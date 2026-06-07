import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DropdownComponent, DropdownItem } from '../../../shared/components/dropdown/dropdown.component';
import { SecurityPersonnel, MOCK_SECURITY_PERSONNEL, MOCK_SYSTEM_STATUS, MOCK_GUARD_ON_DUTY } from './security.model';

@Component({
  selector: 'app-security',
  imports: [MainLayoutComponent, TableComponent, PaginationComponent, DropdownComponent, FormsModule, RouterLink],
  templateUrl: './security.component.html',
})
export class SecurityComponent {
  protected readonly systemStatus = MOCK_SYSTEM_STATUS;
  protected readonly guardOnDuty = MOCK_GUARD_ON_DUTY;

  protected readonly allPersonnel = signal<SecurityPersonnel[]>(MOCK_SECURITY_PERSONNEL);
  protected readonly currentPage = signal<number>(1);
  protected readonly searchQuery = signal<string>('');
  protected readonly sortBy = signal<string>('name');
  protected readonly sortOrder = signal<'asc' | 'desc'>('asc');
  protected readonly pageSize = 10;

  protected readonly sortOptions: DropdownItem[] = [
    { label: 'Nama', value: 'name' },
    { label: 'Posisi', value: 'position' },
    { label: 'Status', value: 'status' },
  ];

  protected readonly totalPersonnel = computed(() => this.allPersonnel().length);

  protected readonly activeCount = computed(
    () => this.allPersonnel().filter((p) => p.status === 'Aktif').length,
  );

  protected readonly absentCount = computed(
    () => this.allPersonnel().filter((p) => p.status === 'Absen' || p.status === 'Cuti' || p.status === 'Tugas Luar').length,
  );

  protected readonly filteredPersonnel = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allPersonnel();
    return this.allPersonnel().filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.position.toLowerCase().includes(query) ||
        p.contact.toLowerCase().includes(query),
    );
  });

  protected readonly sortedPersonnel = computed(() => {
    const list = this.filteredPersonnel();
    const field = this.sortBy();
    const order = this.sortOrder();
    return [...list].sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'position':
          cmp = a.position.localeCompare(b.position);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
      }
      return order === 'desc' ? -cmp : cmp;
    });
  });

  protected readonly displayedPersonnel = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.sortedPersonnel().slice(start, start + this.pageSize);
  });

  protected readonly columns: Column[] = [
    { key: 'name', header: 'Nama' },
    { key: 'contact', header: 'Kontak' },
    { key: 'position', header: 'Posisi' },
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
        position: 'asc',
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
      case 'Absen':
        return 'bg-orange-100 text-orange-700';
      case 'Cuti':
        return 'bg-yellow-100 text-yellow-700';
      case 'Tugas Luar':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  }
}
