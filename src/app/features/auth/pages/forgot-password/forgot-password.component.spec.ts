import { TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ForgotPasswordComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render form with house_no field', () => {
    const fixture = TestBed.createComponent(ForgotPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('#house_no')).toBeTruthy();
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(ForgotPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-logo')).toBeTruthy();
  });

  it('should have link back to login', () => {
    const fixture = TestBed.createComponent(ForgotPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[href="/auth/authorize"]');
    expect(link).toBeTruthy();
    expect(link?.textContent).toContain('Kembali ke Login');
  });

  it('should have current year in footer', () => {
    const fixture = TestBed.createComponent(ForgotPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const year = new Date().getFullYear();
    expect(compiled.textContent).toContain(String(year));
  });
});
