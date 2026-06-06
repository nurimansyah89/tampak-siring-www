import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ComplaintsComponent } from './complaints.component';

describe('ComplaintsComponent', () => {
  let component: ComplaintsComponent;
  let fixture: ComponentFixture<ComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header title', () => {
    const element = fixture.nativeElement;
    expect(element.textContent).toContain('Aduan Warga');
  });

  it('should start with list tab active', () => {
    expect(component.activeTab()).toBe('list');
  });

  it('should switch to form tab', () => {
    component.onTabChange('form');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('form');
  });

  it('should filter complaints on search', () => {
    component.onSearch('lampu');
    fixture.detectChanges();
    expect(component.filteredComplaints().length).toBe(1);
    expect(component.filteredComplaints()[0].title).toContain('Lampu');
  });

  it('should clear search filter', () => {
    component.onSearch('');
    fixture.detectChanges();
    expect(component.filteredComplaints().length).toBe(component.allComplaints().length);
  });

  it('should not submit empty form', () => {
    component.isSubmitting.set(false);
    component.onSubmit();
    expect(component.isSubmitting()).toBe(false);
  });
});
