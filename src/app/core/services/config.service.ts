import { Injectable, PLATFORM_ID, computed, inject, signal, makeStateKey, TransferState } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { environment } from '../../../environments/environment';

export interface RuntimeConfig {
  [key: string]: unknown;
}

const RUNTIME_CONFIG_KEY = makeStateKey<RuntimeConfig>('runtime-config');

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly production = environment.production;

  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly runtimeConfig = signal<RuntimeConfig | null>(null);

  readonly isReady = computed(() => this.runtimeConfig() !== null);

  constructor() {
    if (this.transferState.hasKey(RUNTIME_CONFIG_KEY)) {
      this.runtimeConfig.set(this.transferState.get(RUNTIME_CONFIG_KEY, {} as RuntimeConfig));
    }
  }

  async loadRuntimeConfig(): Promise<void> {
    if (this.runtimeConfig() !== null) return;

    try {
      const res = await fetch('/api/config');
      const data: RuntimeConfig = await res.json();
      this.runtimeConfig.set(data);

      if (isPlatformServer(this.platformId)) {
        this.transferState.set(RUNTIME_CONFIG_KEY, data);
      }
    } catch {
      this.runtimeConfig.set({});
    }
  }
}
