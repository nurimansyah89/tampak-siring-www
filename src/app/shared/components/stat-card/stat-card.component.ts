import { Component, input } from '@angular/core';

export type StatCardVariant = 'default' | 'filled';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  readonly icon = input.required<string>();
  readonly iconBg = input<string>('bg-primary-fixed');
  readonly iconColor = input<string>('text-primary');
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly badge = input<string>();
  readonly badgeClass = input<string>('text-tertiary bg-tertiary-fixed');
  readonly variant = input<StatCardVariant>('default');
  readonly accentBorder = input<string>('border-primary');
  readonly additionalInfo = input<string>();
}
