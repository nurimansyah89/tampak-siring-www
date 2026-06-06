import { Component, signal, viewChild, ElementRef, OnDestroy, inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

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

const AREAS_STATE_KEY = makeStateKey<ClusterArea[]>('cluster-map-areas');

@Component({
  selector: 'app-cluster-map',
  imports: [MainLayoutComponent, ButtonComponent],
  templateUrl: './cluster-map.component.html',
})
export class ClusterMapComponent implements OnDestroy {
  protected readonly showModal = signal(false);

  protected readonly clusterImg = viewChild<ElementRef<HTMLImageElement>>('clusterImg');

  protected readonly hoveredArea = signal<ClusterArea | null>(null);
  protected readonly selectedArea = signal<ClusterArea | null>(null);
  protected readonly tooltipX = signal(0);
  protected readonly tooltipY = signal(0);
  protected readonly highlightLeft = signal(0);
  protected readonly highlightTop = signal(0);
  protected readonly highlightWidth = signal(0);
  protected readonly highlightHeight = signal(0);
  protected readonly placement = signal<'top' | 'bottom'>('top');
  protected readonly areas = signal<ClusterArea[]>([]);
  protected readonly isLoading = signal(true);

  private readonly isHoverDevice: boolean;
  private leaveTimeout: ReturnType<typeof setTimeout> | undefined;
  private isTooltipHovered = false;
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.isHoverDevice =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const stored = this.transferState.get(AREAS_STATE_KEY, null);
    if (stored) {
      this.areas.set(stored);
      this.isLoading.set(false);
      return;
    }

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

        if (isPlatformServer(this.platformId)) {
          this.transferState.set(AREAS_STATE_KEY, merged);
        }

        this.areas.set(merged);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.leaveTimeout);
  }

  protected onMapMove(event: MouseEvent): void {
    if (!this.isHoverDevice) return;
    if (this.selectedArea()) return;

    const target = event.target as HTMLElement;
    if (target.closest('[data-tooltip]')) return;

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
      clearTimeout(this.leaveTimeout);
      if (this.hoveredArea()?.id !== hit.id) {
        this.hoveredArea.set(hit);
        this.updateHighlightRect(hit);
      }
    } else {
      if (this.isTooltipHovered) return;
      this.startLeaveTimer();
    }
  }

  protected onAreaLeave(): void {
    if (!this.isHoverDevice) return;
    if (this.isTooltipHovered) return;
    if (this.selectedArea()) return;
    this.startLeaveTimer();
  }

  protected toggleArea(area: ClusterArea): void {
    if (this.selectedArea()?.id === area.id) {
      this.selectedArea.set(null);
    } else {
      this.selectedArea.set(area);
      this.hoveredArea.set(area);
      this.updateHighlightRect(area);
      this.positionTooltip(area);
    }
  }

  protected onMapClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('[data-tooltip]')) return;

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

    clearTimeout(this.leaveTimeout);

    if (clicked) {
      this.toggleArea(clicked);
    } else {
      this.hoveredArea.set(null);
      this.selectedArea.set(null);
    }
  }

  protected onTooltipEnter(): void {
    this.isTooltipHovered = true;
    clearTimeout(this.leaveTimeout);
  }

  protected onTooltipLeave(): void {
    this.isTooltipHovered = false;
    this.startLeaveTimer();
  }

  private positionTooltip(area: ClusterArea): void {
    const imgEl = this.clusterImg()?.nativeElement;
    if (!imgEl) return;

    const [x1, y1, x2, y2] = area.coords;
    const natCx = (x1 + x2) / 2;
    const natCy = (y1 + y2) / 2;

    const fracX = natCx / imgEl.naturalWidth;
    const fracY = natCy / imgEl.naturalHeight;

    const wrapper = imgEl.parentElement!;
    const wrapperRect = wrapper.getBoundingClientRect();
    const imgRect = imgEl.getBoundingClientRect();

    const cx = imgRect.left - wrapperRect.left + fracX * imgRect.width;
    const cy = imgRect.top - wrapperRect.top + fracY * imgRect.height;

    // Estimate tooltip dimensions: w-64 = 256px, height ~260px
    const estH = 260;
    const gap = 16;

    if (cy < estH + gap && wrapperRect.height - cy >= estH + gap) {
      this.placement.set('bottom');
    } else {
      this.placement.set('top');
    }

    this.tooltipX.set(cx);
    this.tooltipY.set(cy);
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

  private startLeaveTimer(): void {
    clearTimeout(this.leaveTimeout);
    this.leaveTimeout = setTimeout(() => {
      this.hoveredArea.set(null);
    }, 50);
  }

  protected navigateToResident(area: ClusterArea): void {
    this.router.navigate(['/residents', area.id]);
  }

  protected openModal(): void {
    this.showModal.set(true);
  }

  protected closeModal(): void {
    this.showModal.set(false);
  }
}
