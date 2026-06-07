import { Component, input } from '@angular/core';
import { Pet } from '../resident.model';

@Component({
  selector: 'app-resident-pets-card',
  templateUrl: './resident-pets-card.component.html',
})
export class ResidentPetsCardComponent {
  readonly pets = input.required<Pet[]>();
}
