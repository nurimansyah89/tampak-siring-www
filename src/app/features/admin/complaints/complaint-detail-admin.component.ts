import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { DiscussionComponent } from '../../../shared/components/discussion/discussion.component';
import { MOCK_COMPLAINT_ADMIN_DETAILS, ComplaintAdminDetail } from './complaints-admin.model';

@Component({
  selector: 'app-complaint-detail-admin',
  imports: [MainLayoutComponent, DiscussionComponent, RouterLink],
  templateUrl: './complaint-detail-admin.component.html',
})
export class ComplaintDetailAdminComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly complaintId = signal<string>(this.route.snapshot.paramMap.get('id') ?? '');

  protected readonly complaint = computed<ComplaintAdminDetail | null>(() => {
    const id = this.complaintId();
    return MOCK_COMPLAINT_ADMIN_DETAILS.find((c) => c.id === id) ?? null;
  });

  protected readonly statusLabels: Record<string, string> = {
    Baru: 'Baru',
    Diproses: 'Dalam Proses',
    Selesai: 'Selesai',
  };

  protected readonly statusIcons: Record<string, string> = {
    Baru: 'fiber_new',
    Diproses: 'sync',
    Selesai: 'check_circle',
  };

  protected getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Mendesak':
        return 'bg-error/10 text-error';
      case 'Tinggi':
        return 'bg-tertiary/10 text-tertiary';
      case 'Normal':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-secondary/10 text-secondary';
    }
  }

  protected getStatusClass(status: string): string {
    switch (status) {
      case 'Baru':
        return 'bg-tertiary/10 text-tertiary border border-tertiary/20';
      case 'Diproses':
        return 'bg-primary/10 text-primary border border-primary/20';
      case 'Selesai':
        return 'bg-green-100 text-green-700 border border-green-200';
      default:
        return 'bg-secondary/10 text-secondary border border-secondary/20';
    }
  }

  protected getStatusCardClass(status: string): string {
    switch (status) {
      case 'Baru':
        return 'bg-tertiary/15 text-on-tertiary-fixed border border-tertiary/20';
      case 'Diproses':
        return 'bg-primary/15 text-primary border border-primary/20';
      case 'Selesai':
        return 'bg-green-50 text-green-800 border border-green-200';
      default:
        return 'bg-secondary/10 text-secondary border border-secondary/20';
    }
  }

  protected getStatusDot(status: string): string {
    switch (status) {
      case 'Baru':
        return 'bg-tertiary';
      case 'Diproses':
        return 'bg-primary';
      case 'Selesai':
        return 'bg-green-600';
      default:
        return 'bg-secondary';
    }
  }

  protected onAddComment(text: string): void {
    console.log('Admin reply submitted:', text);
  }

  protected goBack(): void {
    this.router.navigate(['/admin/complaints']);
  }
}
