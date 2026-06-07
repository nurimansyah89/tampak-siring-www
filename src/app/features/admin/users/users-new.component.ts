import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-users-new',
  imports: [MainLayoutComponent, ButtonComponent, RouterLink],
  templateUrl: './users-new.component.html',
})
export class UsersNewComponent {
  private readonly router = inject(Router);

  protected readonly namaLengkap = signal('');
  protected readonly email = signal('');
  protected readonly role = signal('');
  protected readonly nomorTelepon = signal('');
  protected readonly kataSandi = signal('');
  protected readonly showPassword = signal(false);

  protected readonly isSubmitting = signal(false);
  protected readonly namaError = signal('');
  protected readonly emailError = signal('');
  protected readonly roleError = signal('');
  protected readonly teleponError = signal('');
  protected readonly sandiError = signal('');

  protected toggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  protected onSubmit(): void {
    let hasError = false;

    if (!this.namaLengkap().trim()) {
      this.namaError.set('Nama lengkap wajib diisi');
      hasError = true;
    } else {
      this.namaError.set('');
    }

    if (!this.email().trim()) {
      this.emailError.set('Email wajib diisi');
      hasError = true;
    } else {
      this.emailError.set('');
    }

    if (!this.role()) {
      this.roleError.set('Role wajib dipilih');
      hasError = true;
    } else {
      this.roleError.set('');
    }

    if (!this.nomorTelepon().trim()) {
      this.teleponError.set('Nomor telepon wajib diisi');
      hasError = true;
    } else {
      this.teleponError.set('');
    }

    if (!this.kataSandi()) {
      this.sandiError.set('Kata sandi wajib diisi');
      hasError = true;
    } else if (this.kataSandi().length < 8) {
      this.sandiError.set('Kata sandi minimal 8 karakter');
      hasError = true;
    } else {
      this.sandiError.set('');
    }

    if (hasError) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/admin/users']);
    }, 1500);
  }
}
