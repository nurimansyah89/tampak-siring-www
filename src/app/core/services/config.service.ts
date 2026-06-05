import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface RuntimeConfig {
  maintenanceMode: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly production = environment.production;
  readonly apiBaseUrl = environment.apiBaseUrl;
  readonly appName = environment.appName;
  readonly featureFlags = environment.featureFlags;

  private readonly runtimeConfig = signal<RuntimeConfig | null>(null);

  readonly maintenanceMode = computed(() => this.runtimeConfig()?.maintenanceMode ?? false);
  readonly isReady = computed(() => this.runtimeConfig() !== null);

  async loadRuntimeConfig(): Promise<void> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/config`);
      const data: RuntimeConfig = await res.json();
      this.runtimeConfig.set(data);
    } catch {
      this.runtimeConfig.set({ maintenanceMode: false });
    }
  }
}
