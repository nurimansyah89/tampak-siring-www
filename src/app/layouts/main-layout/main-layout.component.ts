import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, SidebarComponent, BottomNavComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
