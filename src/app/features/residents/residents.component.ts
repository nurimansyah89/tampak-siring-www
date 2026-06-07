import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { TableComponent, Column } from '../../shared/components/table/table.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { Resident, MOCK_RESIDENTS } from './resident.model';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-residents',
  imports: [MainLayoutComponent, TableComponent, PaginationComponent, RouterLink],
  templateUrl: './residents.component.html',
})
export class ResidentsComponent {
  protected readonly showModal = signal(false);

  protected readonly currentPage = signal(1);
  protected readonly pageSize = PAGE_SIZE;
  protected readonly allResidents = signal<Resident[]>(MOCK_RESIDENTS);

  protected readonly displayedResidents = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.allResidents().slice(start, start + this.pageSize);
  });

  protected readonly columns: Column[] = [
    { key: 'name', header: 'Foto & Nama Pemilik' },
    { key: 'address', header: 'Alamat Rumah' },
    { key: 'actions', header: 'Aksi', headerClass: 'text-right' },
  ];

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected openModal(): void {
    this.showModal.set(true);
  }

  protected closeModal(): void {
    this.showModal.set(false);
  }
}
