import { TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 3);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should compute totalPages correctly', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 3);
    fixture.detectChanges();
    expect(fixture.componentInstance.totalPages()).toBe(15);
  });

  it('should compute startItem and endItem correctly', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('currentPage', 2);
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
    expect(fixture.componentInstance.startItem()).toBe(11);
    expect(fixture.componentInstance.endItem()).toBe(20);
  });

  it('should emit pageChange when goToPage is called', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();

    let emitted = 0;
    fixture.componentInstance.pageChange.subscribe((p) => (emitted = p));
    fixture.componentInstance['goToPage'](3);
    expect(emitted).toBe(3);
  });

  it('should not emit when going to same page', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();

    let emitted = 0;
    fixture.componentInstance.pageChange.subscribe((p) => (emitted = p));
    fixture.componentInstance['goToPage'](1);
    expect(emitted).toBe(0);
  });

  it('should disable prev button on first page', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();

    const prevBtn = fixture.nativeElement.querySelector('button:first-child');
    expect(prevBtn.disabled).toBe(true);
  });

  it('should disable next button on last page', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('currentPage', 5);
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const nextBtn = buttons[buttons.length - 1];
    expect(nextBtn.disabled).toBe(true);
  });
});
