import { TestBed } from '@angular/core/testing';
import { SlideshowComponent } from './slideshow.component';

describe('SlideshowComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideshowComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SlideshowComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should navigate to next slide', () => {
    const fixture = TestBed.createComponent(SlideshowComponent);
    fixture.componentRef.setInput('slides', [
      { image: '', alt: '', badge: '', badgeClass: '', title: '', description: '' },
      { image: '', alt: '', badge: '', badgeClass: '', title: '', description: '' },
    ]);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentIndex()).toBe(0);
    fixture.componentInstance.nextSlide();
    expect(fixture.componentInstance.currentIndex()).toBe(1);
  });
});
