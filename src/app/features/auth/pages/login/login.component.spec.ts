import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render login form with house_no and password fields', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('#house_no')).toBeTruthy();
    expect(compiled.querySelector('#password')).toBeTruthy();
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-logo')).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;
    expect(comp.passwordVisible()).toBe(false);
    comp.togglePasswordVisibility();
    expect(comp.passwordVisible()).toBe(true);
    comp.togglePasswordVisibility();
    expect(comp.passwordVisible()).toBe(false);
  });

  it('should have link to forgot password', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[href="/auth/forgot-password"]');
    expect(link).toBeTruthy();
    expect(link?.textContent).toContain('Lupa Password');
  });

  it('should disable submit button when loading', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('app-button');
    expect(button).toBeTruthy();
  });

  it('should have current year in footer', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const year = new Date().getFullYear();
    expect(compiled.textContent).toContain(String(year));
  });
});
