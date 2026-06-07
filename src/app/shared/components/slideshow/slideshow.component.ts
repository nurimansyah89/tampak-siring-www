import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';

export interface Slide {
  image: string;
  alt: string;
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-slideshow',
  imports: [],
  templateUrl: './slideshow.component.html',
})
export class SlideshowComponent implements OnInit, OnDestroy {
  readonly slides = input.required<Slide[]>();
  readonly swipeThreshold = 50;

  protected currentIndex = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private touchStartX = 0;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  protected goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.resetTimer();
  }

  protected nextSlide(): void {
    const next = (this.currentIndex() + 1) % this.slides().length;
    this.goToSlide(next);
  }

  protected prevSlide(): void {
    const prev = (this.currentIndex() - 1 + this.slides().length) % this.slides().length;
    this.goToSlide(prev);
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.stopTimer();
  }

  protected onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;

    if (Math.abs(deltaX) >= this.swipeThreshold) {
      if (deltaX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    } else {
      this.startTimer();
    }
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  private stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetTimer(): void {
    this.stopTimer();
    this.startTimer();
  }
}
