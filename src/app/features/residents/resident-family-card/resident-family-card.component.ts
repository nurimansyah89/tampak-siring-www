import { Component, input } from '@angular/core';
import { FamilyMember } from '../resident.model';

@Component({
  selector: 'app-resident-family-card',
  templateUrl: './resident-family-card.component.html',
})
export class ResidentFamilyCardComponent {
  readonly familyMembers = input.required<FamilyMember[]>();
}
