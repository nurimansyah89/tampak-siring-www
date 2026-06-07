import { TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StatCardComponent);
    fixture.componentRef.setInput('icon', 'payments');
    fixture.componentRef.setInput('label', 'Total Iuran');
    fixture.componentRef.setInput('value', 'Rp 1.000.000');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render default variant with accent border', () => {
    const fixture = TestBed.createComponent(StatCardComponent);
    fixture.componentRef.setInput('icon', 'payments');
    fixture.componentRef.setInput('label', 'Total Iuran');
    fixture.componentRef.setInput('value', 'Rp 1.000.000');
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('div');
    expect(card.classList.contains('border-l-4')).toBeTrue();
  });

  it('should render filled variant', () => {
    const fixture = TestBed.createComponent(StatCardComponent);
    fixture.componentRef.setInput('icon', 'calendar_month');
    fixture.componentRef.setInput('label', 'Periode');
    fixture.componentRef.setInput('value', 'Desember');
    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('div');
    expect(card.classList.contains('bg-primary-container')).toBeTrue();
  });

  it('should show badge when provided', () => {
    const fixture = TestBed.createComponent(StatCardComponent);
    fixture.componentRef.setInput('icon', 'payments');
    fixture.componentRef.setInput('label', 'Total');
    fixture.componentRef.setInput('value', 'Rp 1.000.000');
    fixture.componentRef.setInput('badge', 'Tahun 2023');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('span.text-xs');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('Tahun 2023');
  });
});
