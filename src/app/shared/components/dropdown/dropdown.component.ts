import { Component, HostListener, input, output, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

export interface DropdownItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [ButtonComponent],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  readonly items = input<DropdownItem[]>([]);
  readonly selected = input<string>('');
  readonly selectionChange = output<string>();

  protected readonly isOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-dropdown')) {
      this.isOpen.set(false);
    }
  }

  protected toggle(): void {
    this.isOpen.update((v) => !v);
  }

  protected select(value: string): void {
    this.selectionChange.emit(value);
    this.isOpen.set(false);
  }
}
