import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SlideshowComponent } from '../../shared/components/slideshow/slideshow.component';
import { BentoCardComponent } from '../../shared/components/bento-card/bento-card.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import type { Slide } from '../../shared/components/slideshow/slideshow.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NavbarComponent, SlideshowComponent, BentoCardComponent, BottomNavComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  protected readonly isAdmin = computed(() => environment.devAdmin || (this.authService.currentUser()?.isAdmin ?? false));
  protected readonly slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
      alt: 'Perumahan Cluster',
      badge: 'Pengumuman Terbaru',
      badgeClass: 'bg-tertiary',
      title: 'Jadwal Fogging Rutin dan Kerja Bakti Lingkungan Cluster',
      description:
        'Kegiatan akan dilaksanakan pada hari Minggu ini untuk menjaga kebersihan dan kesehatan lingkungan kita bersama.',
    },
    {
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80',
      alt: 'Diskusi Keamanan',
      badge: 'Agenda Warga',
      badgeClass: 'bg-primary',
      title: 'Sosialisasi Keamanan Lingkungan',
      description:
        'Mari berdiskusi tentang keamanan cluster pada Sabtu ini di Balai Warga.',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      alt: 'Lingkungan Hijau',
      badge: 'Program Lingkungan',
      badgeClass: 'bg-green-700',
      title: 'Program Hijau Tampaksiring',
      description:
        'Dapatkan bibit tanaman gratis untuk setiap rumah mulai hari Senin.',
    },
  ];
}
