import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ResidentProfileCardComponent } from '../resident-profile-card/resident-profile-card.component';
import { ResidentFamilyCardComponent } from '../resident-family-card/resident-family-card.component';
import { ResidentPetsCardComponent } from '../resident-pets-card/resident-pets-card.component';
import { ResidentDetail, MOCK_RESIDENT_DETAILS } from '../resident.model';

@Component({
  selector: 'app-resident-detail',
  imports: [MainLayoutComponent, ResidentProfileCardComponent, ResidentFamilyCardComponent, ResidentPetsCardComponent, RouterLink],
  templateUrl: './resident-detail.component.html',
})
export class ResidentDetailComponent {
  protected readonly showModal = signal(false);

  protected readonly resident: ResidentDetail | undefined;

  constructor(route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    this.resident = MOCK_RESIDENT_DETAILS.find((r) => r.id === id);
  }

  protected openModal(): void {
    this.showModal.set(true);
  }

  protected closeModal(): void {
    this.showModal.set(false);
  }
}
