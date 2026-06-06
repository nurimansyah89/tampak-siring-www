import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { TurnstileComponent } from '../../../../shared/components/turnstile/turnstile.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { AuthService } from '../../auth.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LogoComponent,
    TurnstileComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  readonly currentYear = new Date().getFullYear();
  readonly loading = signal(false);

  readonly form = new FormGroup({
    houseNo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.loading()) return;

    this.loading.set(true);
    const { houseNo } = this.form.getRawValue();

    setTimeout(() => {
      const result = this.authService.forgotPassword(houseNo);
      this.loading.set(false);

      if (!result.success) {
        this.toastService.show(result.error!, 'alert');
      } else {
        this.toastService.show(
          'Permintaan berhasil diproses. Silakan tunggu informasi lebih lanjut dari admin.',
          'success',
        );
      }
    }, 1200);
  }
}
