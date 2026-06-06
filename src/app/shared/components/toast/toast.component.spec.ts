import { TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ToastComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have stopOnFocus default to true', () => {
    const fixture = TestBed.createComponent(ToastComponent);
    expect(fixture.componentInstance.stopOnFocus()).toBe(true);
  });

  it('should render toast messages from service', () => {
    const service = TestBed.inject(ToastService);
    service.show('Test message', 'alert');
    const fixture = TestBed.createComponent(ToastComponent);
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span?.textContent).toContain('Test message');
  });

  it('should dismiss toast on close button click', () => {
    const service = TestBed.inject(ToastService);
    const id = service.show('Dismiss me', 'default');
    const fixture = TestBed.createComponent(ToastComponent);
    fixture.detectChanges();
    service.dismiss(id);
    fixture.detectChanges();
    const spans = fixture.nativeElement.querySelectorAll('span');
    const toastSpans = Array.from(spans).filter(
      (s: Element) => s.textContent === 'Dismiss me'
    );
    expect(toastSpans.length).toBe(0);
  });

  it('should not throw on hover when stopOnFocus is true', () => {
    const service = TestBed.inject(ToastService);
    service.show('Hover test', 'default');
    const fixture = TestBed.createComponent(ToastComponent);
    fixture.detectChanges();

    const toastEl = fixture.nativeElement.querySelector('[class*="pointer-events-auto"]');

    expect(() => {
      toastEl.dispatchEvent(new Event('mouseenter'));
      toastEl.dispatchEvent(new Event('mouseleave'));
    }).not.toThrow();
  });

  it('should not throw on hover when stopOnFocus is false', () => {
    const service = TestBed.inject(ToastService);
    service.show('Hover test', 'default');
    const fixture = TestBed.createComponent(ToastComponent);
    fixture.componentRef.setInput('stopOnFocus', false);
    fixture.detectChanges();

    const toastEl = fixture.nativeElement.querySelector('[class*="pointer-events-auto"]');

    expect(() => {
      toastEl.dispatchEvent(new Event('mouseenter'));
      toastEl.dispatchEvent(new Event('mouseleave'));
    }).not.toThrow();
  });
});
