import { Component, input, output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
})
export class TabComponent {
  readonly tabs = input.required<TabItem[]>();
  readonly activeTab = input.required<string>();

  readonly activeTabChange = output<string>();

  protected onTabClick(tabId: string): void {
    if (tabId !== this.activeTab()) {
      this.activeTabChange.emit(tabId);
    }
  }
}
