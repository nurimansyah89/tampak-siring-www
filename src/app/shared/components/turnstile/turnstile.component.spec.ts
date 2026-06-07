import { TestBed } from '@angular/core/testing';
import { TurnstileComponent } from './turnstile.component';

describe('TurnstileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnstileComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TurnstileComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render turnstile widget with cf-turnstile class', () => {
    const fixture = TestBed.createComponent(TurnstileComponent);
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.cf-turnstile');
    expect(div).toBeTruthy();
  });

  it('should set data-sitekey attribute from environment default', () => {
    const fixture = TestBed.createComponent(TurnstileComponent);
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.cf-turnstile');
    expect(div.getAttribute('data-sitekey')).toBe('1x00000000000000000000AA');
  });

  it('should set data-theme to light', () => {
    const fixture = TestBed.createComponent(TurnstileComponent);
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.cf-turnstile');
    expect(div.getAttribute('data-theme')).toBe('light');
  });

  it('should set data-language to id-id', () => {
    const fixture = TestBed.createComponent(TurnstileComponent);
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.cf-turnstile');
    expect(div.getAttribute('data-language')).toBe('id-id');
  });

  it('should accept custom siteKey input', () => {
    const fixture = TestBed.createComponent(TurnstileComponent);
    fixture.componentRef.setInput('siteKey', 'custom_key');
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('.cf-turnstile');
    expect(div.getAttribute('data-sitekey')).toBe('custom_key');
  });

  it('should set unique data-callback per instance', () => {
    const fixture1 = TestBed.createComponent(TurnstileComponent);
    const fixture2 = TestBed.createComponent(TurnstileComponent);
    fixture1.detectChanges();
    fixture2.detectChanges();
    const div1 = fixture1.nativeElement.querySelector('.cf-turnstile');
    const div2 = fixture2.nativeElement.querySelector('.cf-turnstile');
    expect(div1.getAttribute('data-callback')).not.toBe(div2.getAttribute('data-callback'));
  });
});
