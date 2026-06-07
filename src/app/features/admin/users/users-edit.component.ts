import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MOCK_USERS } from './users.model';

const ROLE_VALUE_MAP: Record<string, string> = {
  'Super Admin': 'super_admin',
  'Finance Lead': 'finance_lead',
  'Security Officer': 'security_officer',
  Admin: 'admin',
};

@Component({
  selector: 'app-users-edit',
  imports: [MainLayoutComponent, ButtonComponent, RouterLink],
  templateUrl: './users-edit.component.html',
})
export class UsersEditComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly namaLengkap = signal('');
  protected readonly email = signal('');
  protected readonly role = signal('');
  protected readonly nomorTelepon = signal('');
  protected readonly kataSandi = signal('');

  protected readonly isLoading = signal(true);
  protected readonly isSubmitting = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly namaError = signal('');
  protected readonly emailError = signal('');
  protected readonly roleError = signal('');
  protected readonly teleponError = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const user = MOCK_USERS.find((u) => u.id === id);

    if (!user) {
      this.router.navigate(['/admin/users']);
      return;
    }

    this.namaLengkap.set(user.name);
    this.email.set(user.email);
    this.role.set(ROLE_VALUE_MAP[user.role] || user.role.toLowerCase().replace(/\s+/g, '_'));
    this.nomorTelepon.set(user.role);
    this.isLoading.set(false);
  }

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

    if (hasError) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/admin/users']);
    }, 1500);
  }
}
