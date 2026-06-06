import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { TabComponent, TabItem } from '../../shared/components/tab/tab.component';
import { TableComponent, Column } from '../../shared/components/table/table.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToggleComponent } from '../../shared/components/toggle/toggle.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { DropdownComponent, DropdownItem } from '../../shared/components/dropdown/dropdown.component';
import { Complaint, MOCK_COMPLAINTS, Priority, Status } from './complaints.model';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-complaints',
  imports: [
    RouterLink,
    MainLayoutComponent,
    TabComponent,
    TableComponent,
    PaginationComponent,
    ButtonComponent,
    ToggleComponent,
    FileUploadComponent,
    DropdownComponent,
    FormsModule,
  ],
  templateUrl: './complaints.component.html',
})
export class ComplaintsComponent {
  protected readonly tabs: TabItem[] = [
    { id: 'list', label: 'Daftar Aduan', icon: 'list_alt' },
    { id: 'form', label: 'Buat Aduan', icon: 'add_comment' },
  ];

  protected readonly activeTab = signal<string>('list');
  protected readonly searchQuery = signal<string>('');
  protected readonly isSearching = signal(false);
  protected readonly currentPage = signal<number>(1);
  protected readonly sortBy = signal<string>('date');
  protected readonly sortOrder = signal<'asc' | 'desc'>('desc');

  protected readonly sortOptions: DropdownItem[] = [
    { label: 'Tanggal', value: 'date' },
    { label: 'Judul', value: 'title' },
    { label: 'Prioritas', value: 'priority' },
    { label: 'Status', value: 'status' },
  ];

  private readonly priorityWeight: Record<string, number> = {
    Tinggi: 3,
    Sedang: 2,
    Rendah: 1,
  };

  private readonly statusWeight: Record<string, number> = {
    Selesai: 3,
    Proses: 2,
    Terkirim: 1,
  };
  protected readonly isSubmitting = signal<boolean>(false);
  protected readonly allComplaints = signal<Complaint[]>(MOCK_COMPLAINTS);

  protected readonly formModel = signal({
    title: '',
    detail: '',
    priority: 'Sedang' as Priority,
    isAnonymous: false,
  });

  protected selectedFile: File | null = null;

  protected readonly filteredComplaints = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allComplaints();
    return this.allComplaints().filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.resident.toLowerCase().includes(query) ||
        c.date.toLowerCase().includes(query),
    );
  });

  protected readonly sortedComplaints = computed(() => {
    const list = this.filteredComplaints();
    const field = this.sortBy();
    const order = this.sortOrder();
    const sorted = [...list].sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'date':
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          cmp = a.title.localeCompare(b.title);
          break;
        case 'priority':
          cmp = (this.priorityWeight[a.priority] ?? 0) - (this.priorityWeight[b.priority] ?? 0);
          break;
        case 'status':
          cmp = (this.statusWeight[a.status] ?? 0) - (this.statusWeight[b.status] ?? 0);
          break;
      }
      return order === 'desc' ? -cmp : cmp;
    });
    return sorted;
  });

  protected readonly displayedComplaints = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.sortedComplaints().slice(start, start + PAGE_SIZE);
  });

  protected onSortChange(value: string): void {
    if (this.sortBy() === value) {
      this.sortOrder.update((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortBy.set(value);
      const defaultOrders: Record<string, 'asc' | 'desc'> = {
        date: 'desc',
        title: 'asc',
        priority: 'desc',
        status: 'asc',
      };
      this.sortOrder.set(defaultOrders[value] ?? 'asc');
    }
    this.currentPage.set(1);
  }

  protected readonly columns: Column[] = [
    { key: 'date', header: 'Tanggal' },
    { key: 'title', header: 'Judul' },
    { key: 'resident', header: 'Warga' },
    { key: 'priority', header: 'Prioritas', headerClass: 'text-center' },
    { key: 'status', header: 'Status', headerClass: 'text-center' },
  ];

  protected onTabChange(tabId: string): void {
    this.activeTab.set(tabId);
  }

  protected onSearchInput(value: string): void {
    this.isSearching.set(true);
    this.searchQuery.set(value);
    this.currentPage.set(1);
    setTimeout(() => this.isSearching.set(false), 600);
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected onFileSelected(file: File | null): void {
    this.selectedFile = file;
  }

  protected onSubmit(): void {
    const data = this.formModel();
    if (!data.title.trim() || !data.detail.trim()) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      const newComplaint: Complaint = {
        id: String(Date.now()),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        title: data.title,
        resident: data.isAnonymous ? 'Anonim' : 'Anda',
        priority: data.priority,
        status: 'Terkirim',
      };

      this.allComplaints.update((list) => [newComplaint, ...list]);
      this.isSubmitting.set(false);
      this.formModel.set({ title: '', detail: '', priority: 'Sedang', isAnonymous: false });
      this.selectedFile = null;
      this.activeTab.set('list');
      this.currentPage.set(1);
    }, 1500);
  }

  protected getPriorityClass(priority: Priority): string {
    switch (priority) {
      case 'Tinggi':
        return 'bg-error/10 text-error';
      case 'Sedang':
        return 'bg-tertiary/10 text-tertiary';
      case 'Rendah':
        return 'bg-secondary/10 text-secondary';
    }
  }

  protected getStatusClass(status: Status): string {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-700';
      case 'Proses':
        return 'bg-primary/10 text-primary';
      case 'Terkirim':
        return 'bg-secondary/10 text-secondary';
    }
  }
}
