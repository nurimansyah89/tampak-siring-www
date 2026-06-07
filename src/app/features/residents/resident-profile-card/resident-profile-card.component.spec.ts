import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentProfileCardComponent } from './resident-profile-card.component';
import { ResidentDetail } from '../resident.model';

describe('ResidentProfileCardComponent', () => {
  let component: ResidentProfileCardComponent;
  let fixture: ComponentFixture<ResidentProfileCardComponent>;

  const mockResident: ResidentDetail = {
    id: '1',
    name: 'Bambang Susilo',
    role: 'Kepala Keluarga',
    photoUrl: '',
    address: 'Blok A No. 12, Cluster Utama',
    pets: [{ name: 'Si Putih', type: 'Kucing Persian' }],
    familyMembers: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentProfileCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentProfileCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('resident', mockResident);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
