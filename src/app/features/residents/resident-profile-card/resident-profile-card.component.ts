import { Component, input, output } from '@angular/core';
import { ResidentDetail } from '../resident.model';

@Component({
  selector: 'app-resident-profile-card',
  templateUrl: './resident-profile-card.component.html',
})
export class ResidentProfileCardComponent {
  readonly resident = input.required<ResidentDetail>();
  readonly contact = output<void>();
}
