import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { MOCK_FINANCE_TRANSACTIONS } from './finance.model';

export interface PaymentForm {
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string;
  notes: string;
}

@Component({
  selector: 'app-finance-form',
  imports: [MainLayoutComponent, ButtonComponent, FileUploadComponent, FormsModule, RouterLink],
  templateUrl: './finance-form.component.html',
})
export class FinanceFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly residentId = signal<string>(this.route.snapshot.paramMap.get('id') ?? '');

  protected readonly resident = computed(() => {
    const id = this.residentId();
    return MOCK_FINANCE_TRANSACTIONS.find((t) => t.id === id) ?? null;
  });

  protected readonly today = new Date().toISOString().split('T')[0];

  protected form: PaymentForm = {
    paymentDate: this.today,
    amount: 350000,
    paymentMethod: 'transfer',
    referenceNumber: '',
    notes: '',
  };

  protected selectedFile = signal<File | null>(null);
  protected isSubmitting = signal(false);

  protected onFileSelected(file: File | null): void {
    this.selectedFile.set(file);
  }

  protected onSubmit(): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/admin/finance']);
    }, 1500);
  }

  protected goBack(): void {
    this.router.navigate(['/admin/finance']);
  }
}
