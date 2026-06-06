import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineComponent, TimelineEvent } from './timeline.component';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  const mockEvents: TimelineEvent[] = [
    { date: 'Hari ini, 09:15', title: 'Petugas Dalam Perjalanan', description: 'Teknisi ditugaskan.', isActive: true },
    { date: '12 Okt, 20:05', title: 'Laporan Diterima', description: 'Admin memverifikasi laporan.' },
    { date: '12 Okt, 19:45', title: 'Laporan Terkirim', description: 'Laporan baru dibuat.' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('events', mockEvents);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all events', () => {
    const element = fixture.nativeElement as HTMLElement;
    const items = element.querySelectorAll('.relative > .font-label-md');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Petugas Dalam Perjalanan');
    expect(items[1].textContent).toContain('Laporan Diterima');
    expect(items[2].textContent).toContain('Laporan Terkirim');
  });

  it('should mark active event with pulse animation', () => {
    const element = fixture.nativeElement as HTMLElement;
    const bullets = element.querySelectorAll('.absolute.-left-\\[31px\\]');
    expect(bullets[0].classList.contains('animate-pulse')).toBeTrue();
    expect(bullets[1].classList.contains('animate-pulse')).toBeFalse();
  });
});
