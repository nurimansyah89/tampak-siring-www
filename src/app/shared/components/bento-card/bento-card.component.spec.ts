import { TestBed } from '@angular/core/testing';
import { BentoCardComponent } from './bento-card.component';

describe('BentoCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentoCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BentoCardComponent);
    fixture.componentRef.setInput('icon', 'map');
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('description', 'Test desc');
    fixture.componentRef.setInput('actionText', 'Lihat');
    expect(fixture.componentInstance).toBeTruthy();
  });
});
