import { TestBed } from '@angular/core/testing';
import { TabComponent, TabItem } from './tab.component';

describe('TabComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabComponent],
    }).compileComponents();
  });

  const mockTabs: TabItem[] = [
    { id: 'list', label: 'Daftar Aduan', icon: 'list_alt' },
    { id: 'form', label: 'Buat Aduan', icon: 'add_comment' },
  ];

  it('should create', () => {
    const fixture = TestBed.createComponent(TabComponent);
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTab', 'list');
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all tabs', () => {
    const fixture = TestBed.createComponent(TabComponent);
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTab', 'list');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Daftar Aduan');
    expect(buttons[1].textContent).toContain('Buat Aduan');
  });

  it('should apply active class to active tab', () => {
    const fixture = TestBed.createComponent(TabComponent);
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTab', 'list');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].classList.contains('text-primary')).toBe(true);
    expect(buttons[1].classList.contains('text-primary')).toBe(false);
  });

  it('should emit activeTabChange on tab click', () => {
    const fixture = TestBed.createComponent(TabComponent);
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTab', 'list');
    fixture.detectChanges();

    const spy = spyOn(fixture.componentInstance.activeTabChange, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    expect(spy).toHaveBeenCalledWith('form');
  });

  it('should not emit when clicking already active tab', () => {
    const fixture = TestBed.createComponent(TabComponent);
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTab', 'list');
    fixture.detectChanges();

    const spy = spyOn(fixture.componentInstance.activeTabChange, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    expect(spy).not.toHaveBeenCalled();
  });
});
