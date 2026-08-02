import { Component, inject, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownService } from '../../../core/services/markdown.service';
import { MermaidDirective } from '../../../core/directives/mermaid.directive';

@Component({
  selector: 'app-chat-markdown-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MermaidDirective,
  ],
  templateUrl: './chat-markdown-viewer.component.html',
  styleUrl: './chat-markdown-viewer.component.scss',
})
export class ChatMarkdownViewerComponent {
  content = input.required<string>();
  title = input<string>();
  followUpSuggestions = input<string[]>([]);
  disabled = input(false);
  followUpClicked = output<string>();

  private md = inject(MarkdownService);

  renderedContent = computed(() => this.md.render(this.content()));
}
