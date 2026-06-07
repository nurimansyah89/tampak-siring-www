import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  icon: string;
  link: string;
  exact?: boolean;
}

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  protected readonly navItems: NavItem[] = [
    { label: 'Dasbor', icon: 'dashboard', link: '/', exact: true },
    { label: 'Peta Klaster', icon: 'map', link: '/cluster-map' },
    { label: 'Daftar Warga', icon: 'group', link: '/residents' },
    { label: 'Keuangan Klaster', icon: 'account_balance_wallet', link: '/finance' },
    { label: 'Informasi Security', icon: 'security', link: '/security' },
    { label: 'Aduan Warga', icon: 'confirmation_number', link: '/complaints' },
  ];
}
