import { Component, input } from '@angular/core';

export interface Column {
  key: string;
  header: string;
  headerClass?: string;
}

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
})
export class TableComponent {
  readonly columns = input.required<Column[]>();
  readonly loading = input(false);
  readonly loadingRowCount = input(5);
}
