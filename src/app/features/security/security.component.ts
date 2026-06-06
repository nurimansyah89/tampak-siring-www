import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MOCK_PERSONNEL, MOCK_SOP } from './security.model';

@Component({
  selector: 'app-security',
  imports: [MainLayoutComponent, ButtonComponent],
  templateUrl: './security.component.html',
})
export class SecurityComponent {
  protected readonly showModal = signal(false);

  protected readonly personnel = MOCK_PERSONNEL;
  protected readonly sopList = MOCK_SOP;

  protected openModal(): void {
    this.showModal.set(true);
  }

  protected closeModal(): void {
    this.showModal.set(false);
  }
}
