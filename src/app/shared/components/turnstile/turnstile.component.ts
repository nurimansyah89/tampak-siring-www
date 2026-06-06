import { Component, input, output, afterNextRender, inject, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments';

let nextId = 0;

@Component({
  selector: 'app-turnstile',
  imports: [],
  templateUrl: './turnstile.component.html',
})
export class TurnstileComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly containerRef = viewChild<ElementRef<HTMLDivElement>>('container');

  protected readonly instanceId = nextId++;

  readonly siteKey = input(environment.turnstileSiteKey);
  readonly resolved = output<string>();

  private widgetId: string | undefined;

  constructor() {
    afterNextRender(() => {
      this.initTurnstile();
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.widgetId && (window as any).turnstile) {
      (window as any).turnstile.remove(this.widgetId);
    }
  }

  private initTurnstile(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if ((window as any).turnstile) {
      this.renderWidget();
      return;
    }

    if (!document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    this.waitForTurnstile();
  }

  private waitForTurnstile(): void {
    const poll = () => {
      if ((window as any).turnstile) {
        this.renderWidget();
      } else {
        setTimeout(poll, 100);
      }
    };
    poll();
  }

  private renderWidget(): void {
    const container = this.containerRef()?.nativeElement;
    if (!container) return;

    this.widgetId = (window as any).turnstile.render(container, {
      sitekey: this.siteKey(),
      theme: 'light',
      language: 'id-id',
      callback: (token: string) => {
        this.resolved.emit(token);
      },
    });
  }
}
