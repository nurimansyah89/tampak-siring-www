import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../../features/auth/auth.service';

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show admin section when user is admin', () => {
    const authService = TestBed.inject(AuthService);
    authService.currentUser.set({ houseNo: 'Y06-12', isAdmin: true });

    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();

    const adminLabel = fixture.nativeElement.querySelector('p');
    expect(adminLabel?.textContent).toContain('Admin');
  });

  it('should hide admin section when user is not logged in', () => {
    const authService = TestBed.inject(AuthService);
    authService.currentUser.set(null);

    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();

    const adminLabel = fixture.nativeElement.querySelector('p');
    expect(adminLabel).toBeNull();
  });
});
