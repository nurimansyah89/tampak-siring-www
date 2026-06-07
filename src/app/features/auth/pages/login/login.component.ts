import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { TurnstileComponent } from '../../../../shared/components/turnstile/turnstile.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { AuthService } from '../../auth.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LogoComponent,
    TurnstileComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  readonly currentYear = new Date().getFullYear();
  readonly loading = signal(false);
  readonly passwordVisible = signal(false);

  readonly form = new FormGroup({
    houseNo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.loading()) return;

    this.loading.set(true);
    const { houseNo, password } = this.form.getRawValue();

    setTimeout(() => {
      const result = this.authService.login(houseNo, password);
      this.loading.set(false);

      if (!result.success) {
        this.toastService.show(result.error!, 'alert');
      } else {
        this.toastService.show('Login berhasil!', 'success');
        this.router.navigate(['/']);
      }
    }, 1200);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update(v => !v);
  }
}
