import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.dropdownOpen).toBeFalse();
    const button = fixture.nativeElement.querySelector('button[cursor-pointer]');
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.dropdownOpen).toBeTrue();
  });
});
