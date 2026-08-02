import { Component, inject, OnInit, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProblemsStore } from '../../../state/problems.store';
import { MarkdownService } from '../../../core/services/markdown.service';
import { ChatMarkdownViewerComponent } from '../../chat/chat-markdown-viewer/chat-markdown-viewer.component';

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule,
    MatExpansionModule, MatProgressSpinnerModule,
    ChatMarkdownViewerComponent,
  ],
  templateUrl: './problem-detail.component.html',
  styleUrl: './problem-detail.component.scss',
})
export class ProblemDetailComponent implements OnInit {
  slug = input.required<string>();

  private store = inject(ProblemsStore);
  private md = inject(MarkdownService);

  detail = computed(() => this.store.detailCache()[this.slug()]);

  ngOnInit(): void {
    this.store.loadDetail(this.slug());
  }

  renderMd(text: string | null | undefined): string {
    return this.md.render(text);
  }
}
