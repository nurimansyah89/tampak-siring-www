import { Component, input, output, model, HostListener } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  imports: [],
  templateUrl: './lightbox.component.html',
})
export class LightboxComponent {
  readonly images = input.required<string[]>();
  readonly currentIndex = model.required<number>();

  readonly close = output<void>();

  protected get currentImage(): string {
    return this.images()[this.currentIndex()];
  }

  protected get hasPrev(): boolean {
    return this.currentIndex() > 0;
  }

  protected get hasNext(): boolean {
    return this.currentIndex() < this.images().length - 1;
  }

  protected onPrev(event: MouseEvent): void {
    event.stopPropagation();
    if (this.hasPrev) {
      this.currentIndex.set(this.currentIndex() - 1);
    }
  }

  protected onNext(event: MouseEvent): void {
    event.stopPropagation();
    if (this.hasNext) {
      this.currentIndex.set(this.currentIndex() + 1);
    }
  }

  protected onBackdropClick(): void {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close.emit();
  }

  @HostListener('document:keydown.arrowleft')
  protected onArrowLeft(): void {
    if (this.hasPrev) {
      this.currentIndex.set(this.currentIndex() - 1);
    }
  }

  @HostListener('document:keydown.arrowright')
  protected onArrowRight(): void {
    if (this.hasNext) {
      this.currentIndex.set(this.currentIndex() + 1);
    }
  }
}
