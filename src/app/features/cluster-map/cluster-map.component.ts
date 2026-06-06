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
  protected readonly tooltipX = signal(0);
  protected readonly tooltipY = signal(0);
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

  protected onAreaEnter(area: ClusterArea): void {
    if (!this.isHoverDevice) return;
    clearTimeout(this.leaveTimeout);
    this.hoveredArea.set(area);
    this.positionTooltip(area);
  }

  protected onAreaLeave(): void {
    if (!this.isHoverDevice) return;
    if (this.isTooltipHovered) return;
    this.startLeaveTimer();
  }

  protected toggleArea(area: ClusterArea): void {
    if (this.hoveredArea()?.id === area.id) {
      this.hoveredArea.set(null);
    } else {
      this.hoveredArea.set(area);
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

    this.tooltipX.set(imgRect.left - wrapperRect.left + fracX * imgRect.width);
    this.tooltipY.set(imgRect.top - wrapperRect.top + fracY * imgRect.height);
  }

  private startLeaveTimer(): void {
    this.leaveTimeout = setTimeout(() => {
      this.hoveredArea.set(null);
    }, 300);
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
