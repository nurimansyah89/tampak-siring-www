import { Component, viewChild, ElementRef, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

export interface ClusterArea {
  id: string;
  coords: number[];
  ownerName: string;
  houseNumber: string;
  ownerPhotoUrl: string;
}

interface AreaRaw {
  shape: string;
  coords: number[];
  href: string;
  alt: string;
  title: string;
}

interface DetailRaw {
  id: string;
  houseNumber: string;
  ownerName: string;
  ownerPhotoUrl: string;
}

@Component({
  selector: 'app-cluster-map-management',
  imports: [MainLayoutComponent, ButtonComponent, InputComponent, FormsModule],
  templateUrl: './cluster-map-management.component.html',
})
export class ClusterMapManagementComponent {
  protected readonly clusterImg = viewChild<ElementRef<HTMLImageElement>>('clusterImg');

  protected readonly areas = signal<ClusterArea[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly isEditing = signal(false);
  protected readonly editingArea = signal<ClusterArea | null>(null);
  protected readonly hoveredArea = signal<ClusterArea | null>(null);

  protected readonly highlightLeft = signal(0);
  protected readonly highlightTop = signal(0);
  protected readonly highlightWidth = signal(0);
  protected readonly highlightHeight = signal(0);

  protected houseNumber = '';
  protected ownerName = '';
  protected ownerPhotoUrl = '';

  private readonly http = inject(HttpClient);

  constructor() {
    forkJoin({
      rawAreas: this.http.get<AreaRaw[]>('/data/cluster-map-areas.json'),
      rawDetails: this.http.get<DetailRaw[]>('/data/cluster-map-details.json'),
    }).subscribe({
      next: ({ rawAreas, rawDetails }) => {
        const merged = rawAreas.map((a) => {
          const detail = rawDetails.find((d) => d.id === a.title);
          return {
            id: a.title,
            coords: a.coords,
            ownerName: detail?.ownerName ?? '',
            houseNumber: detail?.houseNumber ?? '',
            ownerPhotoUrl: detail?.ownerPhotoUrl ?? '',
          };
        });
        this.areas.set(merged);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  protected startEdit(area: ClusterArea): void {
    this.editingArea.set(area);
    this.hoveredArea.set(area);
    this.houseNumber = area.houseNumber;
    this.ownerName = area.ownerName;
    this.ownerPhotoUrl = area.ownerPhotoUrl;
    this.isEditing.set(true);
  }

  protected onMapMove(event: MouseEvent): void {
    const imgEl = this.clusterImg()?.nativeElement;
    if (!imgEl || !imgEl.naturalWidth) return;

    const rect = imgEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = ((event.clientX - rect.left) / rect.width) * imgEl.naturalWidth;
    const y = ((event.clientY - rect.top) / rect.height) * imgEl.naturalHeight;

    if (x < 0 || y < 0 || x > imgEl.naturalWidth || y > imgEl.naturalHeight) return;

    const hit = this.areas().find((a) => {
      const [c1, c2, c3, c4] = a.coords;
      const minX = Math.min(c1, c3);
      const maxX = Math.max(c1, c3);
      const minY = Math.min(c2, c4);
      const maxY = Math.max(c2, c4);
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    });

    if (hit) {
      this.hoveredArea.set(hit);
      this.updateHighlightRect(hit);
    } else if (!hit) {
      this.hoveredArea.set(null);
    }
  }

  protected onMapLeave(): void {
    if (this.isEditing()) return;
    this.hoveredArea.set(null);
  }

  protected onMapClick(event: MouseEvent): void {
    const imgEl = this.clusterImg()?.nativeElement;
    if (!imgEl) return;

    const rect = imgEl.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * imgEl.naturalWidth;
    const y = ((event.clientY - rect.top) / rect.height) * imgEl.naturalHeight;

    const clicked = this.areas().find((a) => {
      const [c1, c2, c3, c4] = a.coords;
      const minX = Math.min(c1, c3);
      const maxX = Math.max(c1, c3);
      const minY = Math.min(c2, c4);
      const maxY = Math.max(c2, c4);
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    });

    if (clicked) {
      this.startEdit(clicked);
    }
  }

  private updateHighlightRect(area: ClusterArea): void {
    const imgEl = this.clusterImg()?.nativeElement;
    if (!imgEl) return;

    const [x1, y1, x2, y2] = area.coords;
    const fracX1 = x1 / imgEl.naturalWidth;
    const fracY1 = y1 / imgEl.naturalHeight;
    const fracX2 = x2 / imgEl.naturalWidth;
    const fracY2 = y2 / imgEl.naturalHeight;

    const wrapper = imgEl.parentElement!;
    const wrapperRect = wrapper.getBoundingClientRect();
    const imgRect = imgEl.getBoundingClientRect();

    this.highlightLeft.set(imgRect.left - wrapperRect.left + fracX1 * imgRect.width);
    this.highlightTop.set(imgRect.top - wrapperRect.top + fracY1 * imgRect.height);
    this.highlightWidth.set((fracX2 - fracX1) * imgRect.width);
    this.highlightHeight.set((fracY2 - fracY1) * imgRect.height);
  }

  protected cancelEdit(): void {
    this.isEditing.set(false);
    this.editingArea.set(null);
    this.hoveredArea.set(null);
    this.houseNumber = '';
    this.ownerName = '';
    this.ownerPhotoUrl = '';
  }

  protected saveArea(): void {
    if (!this.editingArea()) return;

    const updated: ClusterArea = {
      ...this.editingArea()!,
      ownerName: this.ownerName,
      houseNumber: this.houseNumber,
      ownerPhotoUrl: this.ownerPhotoUrl,
    };

    this.areas.update((list) => list.map((a) => (a.id === updated.id ? updated : a)));
    this.editingArea.set(updated);
    this.cancelEdit();
  }
}
