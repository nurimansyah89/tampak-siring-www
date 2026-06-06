import { TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render logo image with default md size', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('Logo');
    expect(img.getAttribute('src')).toBe('/logo.png');
    expect(img.getAttribute('srcset')).toBe('/logo.2x.png 2x');
    expect(img.classList).toContain('w-28');
  });

  it('should apply sm size class', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.classList).toContain('w-16');
  });

  it('should apply lg size class', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.classList).toContain('w-44');
  });

  it('should apply xl size class', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    fixture.componentRef.setInput('size', 'xl');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.classList).toContain('w-60');
  });
});
