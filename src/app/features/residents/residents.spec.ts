import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResidentsComponent } from './residents.component';

describe('ResidentsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentsComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 12 residents in total', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    expect(fixture.componentInstance['allResidents']().length).toBe(12);
  });

  it('should display 3 residents per page', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.displayedResidents().length).toBe(3);
  });

  it('should change page when onPageChange is called', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    fixture.componentInstance.onPageChange(2);
    expect(fixture.componentInstance.currentPage()).toBe(2);
    expect(fixture.componentInstance.displayedResidents()[0].id).toBe('4');
  });

  it('should open modal when openModal is called', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    fixture.componentInstance.openModal();
    expect(fixture.componentInstance.showModal()).toBe(true);
  });

  it('should close modal when closeModal is called', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    fixture.componentInstance.openModal();
    expect(fixture.componentInstance.showModal()).toBe(true);
    fixture.componentInstance.closeModal();
    expect(fixture.componentInstance.showModal()).toBe(false);
  });

  it('should render table with columns', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toContain('Foto & Nama Pemilik');
    expect(headers[1].textContent).toContain('Alamat Rumah');
    expect(headers[2].textContent).toContain('Aksi');
  });

  it('should render pagination', () => {
    const fixture = TestBed.createComponent(ResidentsComponent);
    fixture.detectChanges();
    const paginationInfo = fixture.nativeElement.querySelector('.font-label-sm');
    expect(paginationInfo.textContent).toContain('Menampilkan');
  });
});
