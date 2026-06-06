import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NewsCreateComponent } from './news-create.component';

describe('NewsCreateComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCreateComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewsCreateComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render form title', () => {
    const fixture = TestBed.createComponent(NewsCreateComponent);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Buat Berita & Pengumuman Baru');
  });

  it('should have default kategori set to Berita', () => {
    const fixture = TestBed.createComponent(NewsCreateComponent);
    expect(fixture.componentInstance.kategori()).toBe('Berita');
  });

  it('should have default status set to Aktif', () => {
    const fixture = TestBed.createComponent(NewsCreateComponent);
    expect(fixture.componentInstance.status()).toBe('Aktif');
  });

  it('should show validation error when judul is empty on submit', () => {
    const fixture = TestBed.createComponent(NewsCreateComponent);
    fixture.detectChanges();
    fixture.componentInstance.onSubmit();
    fixture.detectChanges();
    expect(fixture.componentInstance.judulError()).toBe('Judul wajib diisi');
  });
});
