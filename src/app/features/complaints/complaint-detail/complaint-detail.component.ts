import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { TimelineComponent } from '../../../shared/components/timeline/timeline.component';
import { DiscussionComponent } from '../../../shared/components/discussion/discussion.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LightboxComponent } from '../../../shared/components/lightbox/lightbox.component';
import {
  ComplaintDetail,
  MOCK_COMPLAINT_DETAILS,
  Priority,
  Status,
  Comment,
} from '../complaints.model';

@Component({
  selector: 'app-complaint-detail',
  imports: [
    MainLayoutComponent,
    RouterLink,
    TimelineComponent,
    DiscussionComponent,
    ButtonComponent,
    LightboxComponent,
  ],
  templateUrl: './complaint-detail.component.html',
})
export class ComplaintDetailComponent {
  protected readonly complaint: ComplaintDetail | undefined;

  protected readonly showLightbox = signal(false);
  protected readonly lightboxIndex = signal(0);

  constructor(route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    this.complaint = MOCK_COMPLAINT_DETAILS.find((c) => c.id === id);
  }

  protected getStatusLabel(status: Status): string {
    switch (status) {
      case 'Selesai':
        return 'Selesai';
      case 'Proses':
        return 'Dalam Proses';
      case 'Terkirim':
        return 'Terkirim';
    }
  }

  protected getPriorityLabel(priority: Priority): string {
    switch (priority) {
      case 'Tinggi':
        return 'Prioritas Tinggi';
      case 'Sedang':
        return 'Prioritas Sedang';
      case 'Rendah':
        return 'Prioritas Rendah';
    }
  }

  protected getPriorityClass(priority: Priority): string {
    switch (priority) {
      case 'Tinggi':
        return 'bg-error-container text-on-error-container';
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
        return 'bg-tertiary/10 text-tertiary';
      case 'Terkirim':
        return 'bg-secondary/10 text-secondary';
    }
  }

  protected openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.showLightbox.set(true);
  }

  protected closeLightbox(): void {
    this.showLightbox.set(false);
  }

  protected onAddComment(text: string): void {
    console.log('Comment submitted:', text);
  }
}
