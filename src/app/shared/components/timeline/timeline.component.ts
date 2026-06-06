import { Component, input } from '@angular/core';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  readonly events = input.required<TimelineEvent[]>();
}
