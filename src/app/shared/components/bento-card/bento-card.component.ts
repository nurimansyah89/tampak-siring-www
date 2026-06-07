import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bento-card',
  imports: [RouterLink],
  templateUrl: './bento-card.component.html',
})
export class BentoCardComponent {
  readonly icon = input.required<string>();
  readonly iconBg = input<string>('bg-primary-fixed');
  readonly iconColor = input<string>('text-primary');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly actionText = input.required<string>();
  readonly link = input<string>();
}
