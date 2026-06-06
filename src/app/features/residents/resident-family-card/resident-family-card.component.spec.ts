import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentFamilyCardComponent } from './resident-family-card.component';

describe('ResidentFamilyCardComponent', () => {
  let component: ResidentFamilyCardComponent;
  let fixture: ComponentFixture<ResidentFamilyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentFamilyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentFamilyCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('familyMembers', [
      { name: 'Siti Aminah', relation: 'Istri' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
