import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscussionComponent, Comment } from './discussion.component';

describe('DiscussionComponent', () => {
  let component: DiscussionComponent;
  let fixture: ComponentFixture<DiscussionComponent>;

  const mockComments: Comment[] = [
    { id: 'c1', author: 'Budi Santoso', isAdmin: false, date: '13 Okt, 08:30', content: 'Betul pak.' },
    { id: 'c2', author: 'Tim Maintenance (Admin)', isAdmin: true, date: '13 Okt, 09:15', content: 'Teknisi sedang menuju lokasi.' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscussionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('comments', mockComments);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all comments', () => {
    const element = fixture.nativeElement as HTMLElement;
    const items = element.querySelectorAll('h4.font-label-md');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Budi Santoso');
    expect(items[1].textContent).toContain('Tim Maintenance (Admin)');
  });

  it('should display admin tag for admin comments', () => {
    const element = fixture.nativeElement as HTMLElement;
    const adminIcon = element.querySelector('.material-symbols-outlined.text-on-primary-container');
    expect(adminIcon).toBeTruthy();
    expect(adminIcon?.textContent).toContain('support_agent');
  });

  it('should emit text on send', () => {
    spyOn(component.submitComment, 'emit');
    component['newComment'].set('Test comment');
    component['onSend']();
    expect(component.submitComment.emit).toHaveBeenCalledWith('Test comment');
    expect(component['newComment']()).toBe('');
  });

  it('should not emit empty comment', () => {
    spyOn(component.submitComment, 'emit');
    component['onSend']();
    expect(component.submitComment.emit).not.toHaveBeenCalled();
  });
});
