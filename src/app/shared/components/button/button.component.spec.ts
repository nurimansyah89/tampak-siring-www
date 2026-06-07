import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render content via ng-content', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.nativeElement.innerHTML = '<span>Click me</span>';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Click me');
  });

  it('should apply primary variant by default', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('bg-primary');
  });

  it('should be disabled when disabled input is true', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('should show loading text when loading', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('Memproses...');
  });

  it('should apply sm size classes', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('px-3')).toBe(true);
    expect(button.classList.contains('py-2')).toBe(true);
    expect(button.classList.contains('text-label-sm')).toBe(true);
    expect(button.classList.contains('w-auto')).toBe(true);
  });

  it('should apply lg size classes', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('px-8')).toBe(true);
    expect(button.classList.contains('py-5')).toBe(true);
    expect(button.classList.contains('text-title-md')).toBe(true);
  });

  it('should default to md size', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('px-6')).toBe(true);
    expect(button.classList.contains('py-4')).toBe(true);
    expect(button.classList.contains('text-label-md')).toBe(true);
  });
});
