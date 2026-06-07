import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { MOCK_PROFILE } from './me.model';

@Component({
  selector: 'app-me',
  imports: [MainLayoutComponent, ButtonComponent, InputComponent, FormsModule],
  templateUrl: './me.component.html',
})
export class MeComponent {
  protected readonly profile = MOCK_PROFILE;

  protected editName = signal(MOCK_PROFILE.name);
  protected editPhone = signal(MOCK_PROFILE.phone);
  protected editEmail = signal(MOCK_PROFILE.email);

  protected currentPassword = signal('');
  protected newPassword = signal('');
  protected confirmPassword = signal('');

  protected showCurrentPassword = signal(false);
  protected showNewPassword = signal(false);
  protected showConfirmPassword = signal(false);

  protected toggleCurrentPassword(): void {
    this.showCurrentPassword.update((v) => !v);
  }

  protected toggleNewPassword(): void {
    this.showNewPassword.update((v) => !v);
  }

  protected toggleConfirmPassword(): void {
    this.showConfirmPassword.update((v) => !v);
  }

  protected saveProfile(): void {
    console.log('Profile saved:', {
      name: this.editName(),
      phone: this.editPhone(),
      email: this.editEmail(),
    });
  }

  protected changePassword(): void {
    console.log('Password changed');
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
  }
}
