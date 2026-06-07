import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AdminUser, MOCK_USERS } from './users.model';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-users',
  imports: [MainLayoutComponent, TableComponent, PaginationComponent, RouterLink],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  protected readonly allUsers = signal<AdminUser[]>(MOCK_USERS);
  protected readonly currentPage = signal<number>(1);
  protected readonly pageSize = PAGE_SIZE;

  protected readonly stats = computed(() => {
    const list = this.allUsers();
    return {
      total: list.length,
      superAdmin: list.filter((u) => u.role === 'Super Admin').length,
      activeRoles: new Set(list.map((u) => u.role)).size,
    };
  });

  protected readonly columns: Column[] = [
    { key: 'name', header: 'Administrator' },
    { key: 'role', header: 'Role' },
    { key: 'lastLogin', header: 'Terakhir Masuk' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Aksi', headerClass: 'text-right' },
  ];

  protected readonly displayedUsers = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.allUsers().slice(start, start + PAGE_SIZE);
  });

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected onDelete(id: string): void {
    if (!window.confirm('Hapus administrator ini?')) return;
    this.allUsers.update((list) => list.filter((u) => u.id !== id));
  }
}
