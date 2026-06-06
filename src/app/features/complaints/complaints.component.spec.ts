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
    component.onSearchInput('lampu');
    fixture.detectChanges();
    expect(component.filteredComplaints().length).toBe(1);
    expect(component.filteredComplaints()[0].title).toContain('Lampu');
  });

  it('should clear search filter', () => {
    component.onSearchInput('');
    fixture.detectChanges();
    expect(component.filteredComplaints().length).toBe(component.allComplaints().length);
  });

  it('should not submit empty form', () => {
    component.isSubmitting.set(false);
    component.onSubmit();
    expect(component.isSubmitting()).toBe(false);
  });

  it('should sort by title ascending on first click', () => {
    component.onSortChange('title');
    fixture.detectChanges();
    const titles = component.sortedComplaints().map((c) => c.title);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sorted);
  });

  it('should toggle sort order on same field click', () => {
    component.onSortChange('title');
    const firstOrder = component.sortOrder();
    component.onSortChange('title');
    expect(component.sortOrder()).not.toBe(firstOrder);
  });

  it('should sort by date descending by default', () => {
    component.onSortChange('date');
    fixture.detectChanges();
    const dates = component.sortedComplaints().map((c) => c.date);
    const sorted = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    expect(dates).toEqual(sorted);
  });

  it('should reset to page 1 on sort change', () => {
    component.currentPage.set(3);
    component.onSortChange('status');
    expect(component.currentPage()).toBe(1);
  });
});
