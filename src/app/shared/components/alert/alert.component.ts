import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alert',
  imports: [RouterLink],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  readonly variant = input<'success' | 'alert'>('success');
  readonly message = input('');
  readonly link = input<string | undefined>(undefined);
}
