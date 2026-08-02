import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownService } from '../../../../core/services/markdown.service';

export interface Hint {
  slug: string;
  level: number;
  text: string;
}

@Component({
  selector: 'app-chat-hint-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './chat-hint-card.component.html',
  styleUrl: './chat-hint-card.component.scss',
})
export class ChatHintCardComponent {
  hints = input<Hint[]>([]);
  problemTitle = input<string>();

  private md = inject(MarkdownService);

  revealedHints = signal<Set<number>>(new Set());

  isRevealed(level: number): boolean {
    return this.revealedHints().has(level);
  }

  reveal(level: number): void {
    const updated = new Set(this.revealedHints());
    updated.add(level);
    this.revealedHints.set(updated);
  }

  renderMd(text: string): string {
    return this.md.render(text);
  }
}
