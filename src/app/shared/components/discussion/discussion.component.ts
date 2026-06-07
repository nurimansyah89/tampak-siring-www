import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  isAdmin: boolean;
  date: string;
  content: string;
}

@Component({
  selector: 'app-discussion',
  imports: [FormsModule],
  templateUrl: './discussion.component.html',
})
export class DiscussionComponent {
  readonly comments = input.required<Comment[]>();
  readonly currentUserAvatar = input<string>('');

  readonly submitComment = output<string>();

  protected readonly newComment = signal<string>('');

  protected onSend(): void {
    const text = this.newComment().trim();
    if (!text) return;
    this.submitComment.emit(text);
    this.newComment.set('');
  }
}
