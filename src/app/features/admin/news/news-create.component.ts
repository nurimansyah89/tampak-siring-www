import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-news-create',
  imports: [MainLayoutComponent, ButtonComponent, RouterLink, FormsModule],
  templateUrl: './news-create.component.html',
})
export class NewsCreateComponent {
  private readonly router = inject(Router);

  protected readonly judul = signal('');
  protected readonly kategori = signal<'Berita' | 'Pengumuman'>('Berita');
  protected readonly deskripsi = signal('');
  protected readonly tautan = signal('');
  protected readonly status = signal<'Aktif' | 'Non-Aktif'>('Aktif');
  protected readonly gambar = signal<File | null>(null);
  protected readonly gambarPreview = signal<string | null>(null);

  protected readonly isSubmitting = signal(false);
  protected readonly judulError = signal('');
  protected readonly gambarError = signal('');

  protected onGambarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;

    this.gambar.set(file);
    this.gambarError.set('');
    const reader = new FileReader();
    reader.onload = () => this.gambarPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  protected removeGambar(): void {
    this.gambar.set(null);
    this.gambarPreview.set(null);
  }

  protected onSubmit(): void {
    let hasError = false;

    if (!this.judul().trim()) {
      this.judulError.set('Judul wajib diisi');
      hasError = true;
    } else {
      this.judulError.set('');
    }

    if (!this.gambar()) {
      this.gambarError.set('Gambar banner wajib diunggah');
      hasError = true;
    } else {
      this.gambarError.set('');
    }

    if (hasError) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/admin/news']);
    }, 1500);
  }
}
