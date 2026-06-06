import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly elementRef = inject(ElementRef);

  protected dropdownOpen = false;

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.dropdownOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  protected toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  protected closeDropdown(): void {
    this.dropdownOpen = false;
  }
}
