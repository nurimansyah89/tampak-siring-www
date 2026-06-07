import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MOCK_SECURITY_PERSONNEL } from './security.model';

@Component({
  selector: 'app-security-edit',
  imports: [MainLayoutComponent, ButtonComponent, RouterLink],
  templateUrl: './security-edit.component.html',
})
export class SecurityEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly isLoading = signal(true);
  protected readonly namaLengkap = signal('');
  protected readonly idSecurity = signal('');
  protected readonly nomorTelepon = signal('');
  protected readonly status = signal<'Aktif' | 'Absen/Sakit'>('Aktif');
  protected readonly catatanInternal = signal('');
  protected readonly foto = signal<File | null>(null);
  protected readonly fotoPreview = signal<string | null>(null);
  protected readonly fotoError = signal('');

  protected readonly isSubmitting = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const personel = MOCK_SECURITY_PERSONNEL.find((p) => p.id === id);
      if (personel) {
        this.namaLengkap.set(personel.name);
        this.nomorTelepon.set(personel.contact.replace(/[^0-9]/g, ''));
        this.idSecurity.set('SEC-' + personel.id.padStart(4, '0'));
      }
    }
    this.isLoading.set(false);
  }

  protected onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;

    this.fotoError.set('');

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.fotoError.set('Hanya file JPG dan PNG yang diperbolehkan');
      input.value = '';
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      this.fotoError.set('Ukuran file maksimal 2MB');
      input.value = '';
      return;
    }

    this.foto.set(file);
    const reader = new FileReader();
    reader.onload = () => this.fotoPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  protected hapusFoto(): void {
    this.foto.set(null);
    this.fotoPreview.set(null);
    this.fotoError.set('');
  }

  protected triggerFileInput(): void {
    document.getElementById('fotoSecurityInput')?.click();
  }

  protected onSubmit(): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/admin/security']);
    }, 1500);
  }
}
