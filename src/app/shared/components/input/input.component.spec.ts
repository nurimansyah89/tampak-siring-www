import { TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InputComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render input element', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.detectChanges();
    const inputEl = fixture.nativeElement.querySelector('input');
    expect(inputEl).toBeTruthy();
  });

  it('should display label when provided', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('label', 'No. Rumah');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No. Rumah');
  });

  it('should render left icon when provided', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('leftIcon', 'home');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.material-symbols-outlined');
    expect(icon).toBeTruthy();
    expect(icon.textContent).toContain('home');
  });

  it('should update value on input', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.detectChanges();
    const inputEl = fixture.nativeElement.querySelector('input');
    inputEl.value = 'Y06-12';
    inputEl.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.value()).toBe('Y06-12');
  });
});
