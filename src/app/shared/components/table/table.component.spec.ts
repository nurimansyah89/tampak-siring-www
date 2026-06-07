import { TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('columns', []);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render column headers', () => {
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Nama' },
      { key: 'age', header: 'Umur' },
    ]);
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toContain('Nama');
    expect(headers[1].textContent).toContain('Umur');
  });

  it('should apply headerClass when provided', () => {
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Nama', headerClass: 'text-right' },
    ]);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('th');
    expect(header.classList.contains('text-right')).toBe(true);
  });

  it('should project content into tbody', () => {
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Nama' },
    ]);
    fixture.nativeElement.innerHTML = '<tr><td>John</td></tr>';
    fixture.detectChanges();

    const cell = fixture.nativeElement.querySelector('tbody td');
    expect(cell.textContent).toContain('John');
  });
});
