import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface AnggotaKeluarga {
  nama: string;
  hubungan: string;
}

interface HewanPeliharaan {
  jenis: string;
  jumlah: number;
}

@Component({
  selector: 'app-resident-new',
  imports: [MainLayoutComponent, ButtonComponent, RouterLink],
  templateUrl: './resident-new.component.html',
})
export class ResidentNewComponent {
  protected readonly namaLengkap = signal('');
  protected readonly nik = signal('');
  protected readonly nomorTelepon = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly konfirmasiPassword = signal('');
  protected readonly blokProperti = signal('');
  protected readonly nomorRumah = signal('');
  protected readonly statusKepemilikan = signal<'Pemilik' | 'Penyewa'>('Pemilik');
  protected readonly tipeRumah = signal('');
  protected readonly statusApproval = signal<'ya' | 'tidak'>('tidak');

  protected readonly anggotaKeluarga = signal<AnggotaKeluarga[]>([]);

  protected readonly hewanPeliharaan = signal<HewanPeliharaan[]>([]);

  protected readonly isSubmitting = signal(false);

  protected readonly fotoProfil = signal<File | null>(null);
  protected readonly fotoProfilPreview = signal<string | null>(null);
  protected readonly fotoProfilError = signal('');

  protected readonly daftarBlok = [
    'Blok A', 'Blok B', 'Blok C', 'Blok D', 'Blok E',
  ];

  protected readonly daftarTipeRumah = [
    { label: 'Freesia – A (LB 42/LT 84)', value: 'Freesia – A' },
    { label: 'Freesia (LB 45/LT 105)', value: 'Freesia' },
    { label: 'Gardenia (LB 57/LT 120)', value: 'Gardenia' },
    { label: 'Heliconia (LB 72/LT 135)', value: 'Heliconia' },
  ];

  protected readonly daftarHubungan = [
    'Istri', 'Suami', 'Anak', 'Orang Tua', 'Asisten Rumah Tangga',
  ];

  protected tambahAnggota(): void {
    this.anggotaKeluarga.update((list) => [...list, { nama: '', hubungan: 'Istri' }]);
  }

  protected hapusAnggota(index: number): void {
    this.anggotaKeluarga.update((list) => list.filter((_, i) => i !== index));
  }

  protected tambahHewan(): void {
    this.hewanPeliharaan.update((list) => [...list, { jenis: '', jumlah: 1 }]);
  }

  protected hapusHewan(index: number): void {
    this.hewanPeliharaan.update((list) => list.filter((_, i) => i !== index));
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  protected onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;

    this.fotoProfilError.set('');

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.fotoProfilError.set('Hanya file JPG dan PNG yang diperbolehkan');
      input.value = '';
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      this.fotoProfilError.set('Ukuran file maksimal 2MB');
      input.value = '';
      return;
    }

    this.fotoProfil.set(file);
    const reader = new FileReader();
    reader.onload = () => this.fotoProfilPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  protected hapusFoto(): void {
    this.fotoProfil.set(null);
    this.fotoProfilPreview.set(null);
    this.fotoProfilError.set('');
  }

  protected triggerFileInput(): void {
    document.getElementById('fotoProfilInput')?.click();
  }

  protected onSubmit(): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
    }, 1500);
  }
}
