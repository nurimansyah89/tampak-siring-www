import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  readonly currentPage = input.required<number>();
  readonly totalItems = input.required<number>();
  readonly pageSize = input<number>(10);

  readonly pageChange = output<number>();

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalItems() / this.pageSize())),
  );

  readonly startItem = computed(() =>
    this.totalItems() > 0 ? (this.currentPage() - 1) * this.pageSize() + 1 : 0,
  );

  readonly endItem = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.totalItems()),
  );

  readonly pages = computed<(number | 'ellipsis')[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const result: (number | 'ellipsis')[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) result.push(i);
    } else {
      result.push(1);

      if (current > 3) {
        result.push('ellipsis');
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) result.push(i);

      if (current < total - 2) {
        result.push('ellipsis');
      }

      result.push(total);
    }

    return result;
  });

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.pageChange.emit(page);
  }
}
