import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentPetsCardComponent } from './resident-pets-card.component';

describe('ResidentPetsCardComponent', () => {
  let component: ResidentPetsCardComponent;
  let fixture: ComponentFixture<ResidentPetsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentPetsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentPetsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pets', [
      { name: 'Si Putih', type: 'Kucing Persian' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
