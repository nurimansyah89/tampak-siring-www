import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MainLayoutComponent, ButtonComponent],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  private readonly elementRef = inject(ElementRef);

  @HostListener('document:mousemove', ['$event'])
  protected onMouseMove(e: MouseEvent): void {
    const ghost = this.elementRef.nativeElement.querySelector('.error-ghost') as HTMLElement | null;
    if (!ghost) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
    ghost.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  }
}
