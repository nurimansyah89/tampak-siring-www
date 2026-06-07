import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { LightboxComponent } from '../../../shared/components/lightbox/lightbox.component';
import { MOCK_PAYMENT_DETAILS, PaymentDetail } from './finance.model';

@Component({
  selector: 'app-finance-detail',
  imports: [MainLayoutComponent, LightboxComponent, RouterLink],
  templateUrl: './finance-detail.component.html',
})
export class FinanceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly paymentId = signal<string>(this.route.snapshot.paramMap.get('id') ?? '');

  protected readonly payment = computed<PaymentDetail | null>(() => {
    const id = this.paymentId();
    return MOCK_PAYMENT_DETAILS.find((p) => p.id === id) ?? null;
  });

  protected showLightbox = signal(false);
  protected lightboxIndex = signal(0);

  protected formatAmount(amount: number): string {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }

  protected getMethodIcon(method: string): string {
    switch (method) {
      case 'Transfer Bank': return 'account_balance';
      case 'E-Wallet': return 'wallet';
      case 'Tunai': return 'payments';
      default: return 'receipt_long';
    }
  }

  protected openLightbox(): void {
    this.lightboxIndex.set(0);
    this.showLightbox.set(true);
  }

  protected closeLightbox(): void {
    this.showLightbox.set(false);
  }

  protected downloadProof(): void {
    const proofUrl = this.payment()?.proofImageUrl;
    if (proofUrl) {
      window.open(proofUrl, '_blank');
    }
  }

  protected goBack(): void {
    this.router.navigate(['/admin/finance']);
  }
}
