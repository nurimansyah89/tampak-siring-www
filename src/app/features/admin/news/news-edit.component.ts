import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MOCK_NEWS } from './news.model';

@Component({
  selector: 'app-news-edit',
  imports: [MainLayoutComponent, ButtonComponent, RouterLink, FormsModule],
  templateUrl: './news-edit.component.html',
})
export class NewsEditComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly judul = signal('');
  protected readonly kategori = signal<'Berita' | 'Pengumuman'>('Berita');
  protected readonly deskripsi = signal('');
  protected readonly tautan = signal('');
  protected readonly status = signal<'Aktif' | 'Non-Aktif'>('Aktif');
  protected readonly gambar = signal<File | null>(null);
  protected readonly gambarPreview = signal<string | null>(null);
  protected readonly id = signal<string>('');

  protected readonly isSubmitting = signal(false);
  protected readonly isLoading = signal(true);
  protected readonly judulError = signal('');
  protected readonly gambarError = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const item = MOCK_NEWS.find((n) => n.id === id);

    if (!item) {
      this.router.navigate(['/admin/news']);
      return;
    }

    this.id.set(item.id);
    this.judul.set(item.title);
    this.kategori.set(item.category);
    this.deskripsi.set(item.description);
    this.status.set(item.status);
    this.gambarPreview.set(item.thumbnail);
    this.isLoading.set(false);
  }

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

    if (!this.gambarPreview()) {
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
