import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  protected readonly sizeClass = computed(() => {
    const map: Record<string, string> = {
      sm: 'w-16 h-auto',
      md: 'w-28 h-auto',
      lg: 'w-44 h-auto',
      xl: 'w-60 h-auto',
    };
    return map[this.size()] ?? map['md'];
  });
}
