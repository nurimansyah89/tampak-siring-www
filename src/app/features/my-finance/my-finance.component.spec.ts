import { TestBed } from '@angular/core/testing';
import { MyFinanceComponent } from './my-finance.component';

describe('MyFinanceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFinanceComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MyFinanceComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have summary data', () => {
    const fixture = TestBed.createComponent(MyFinanceComponent);
    expect(fixture.componentInstance.summary).toBeDefined();
    expect(fixture.componentInstance.summary.totalPaid).toBe(4200000);
  });

  it('should have payment records', () => {
    const fixture = TestBed.createComponent(MyFinanceComponent);
    expect(fixture.componentInstance.payments.length).toBeGreaterThan(0);
  });

  it('should format currency correctly', () => {
    const fixture = TestBed.createComponent(MyFinanceComponent);
    const result = fixture.componentInstance.formatCurrency(4200000);
    expect(result).toBe('4.200.000');
  });
});
