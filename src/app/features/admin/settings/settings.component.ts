import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ToggleComponent } from '../../../shared/components/toggle/toggle.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-settings',
  imports: [MainLayoutComponent, ToggleComponent, ButtonComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  protected readonly maintenanceMode = signal(false);
  protected readonly maintenanceMessage = signal('');
  protected readonly emailAlerts = signal(true);
  protected readonly weeklyReports = signal(true);
  protected readonly securityPatches = signal(true);
  protected readonly nightlyBackups = signal(true);
  protected readonly isSaving = signal(false);

  protected toggleMaintenance(): void {
    this.maintenanceMode.update((v) => !v);
  }

  protected setMaintenanceMessage(event: Event): void {
    this.maintenanceMessage.set((event.target as HTMLTextAreaElement).value);
  }

  protected setTemplateMessage(template: string): void {
    this.maintenanceMessage.set(template);
  }

  protected saveChanges(): void {
    this.isSaving.set(true);
    setTimeout(() => {
      this.isSaving.set(false);
    }, 1500);
  }

  protected readonly messageTemplates = [
    { label: 'Pesan Default', value: 'Saat ini kami sedang melakukan pemeliharaan sistem terjadwal untuk meningkatkan layanan. Kami perkirakan akan kembali online pada pukul 14:00 WITA.' },
    { label: 'Darurat Sistem', value: 'Maaf atas ketidaknyamanannya. Saat ini sedang terjadi pemeliharaan darurat sistem. Tim teknis sedang bekerja untuk memulihkan layanan secepat mungkin.' },
    { label: 'Pembaruan Terjadwal', value: 'Portal sedang dalam pembaruan terjadwal. Beberapa fitur mungkin tidak dapat diakses sementara waktu. Harap kembali lagi nanti.' },
  ];
}
