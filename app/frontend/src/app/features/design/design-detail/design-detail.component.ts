import { Component, inject, input, computed, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DesignStore } from '../../../state/design.store';
import { ChatStore } from '../../../state/chat.store';
import { ModelsStore } from '../../../state/models.store';
import { ChatMarkdownViewerComponent } from '../../chat/chat-markdown-viewer/chat-markdown-viewer.component';
import { TopicSpoilerComponent } from '../../../shared/topic-spoiler/topic-spoiler.component';
import { DesignDetail } from '../../../core/models/design.model';

@Component({
  selector: 'app-design-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, MatProgressSpinnerModule,
    ChatMarkdownViewerComponent, TopicSpoilerComponent,
  ],
  templateUrl: './design-detail.component.html',
  styleUrl: './design-detail.component.scss',
})
export class DesignDetailComponent {
  slug = input.required<string>();

  readonly store = inject(DesignStore);
  private chatStore = inject(ChatStore);
  private modelsStore = inject(ModelsStore);
  private router = inject(Router);

  detail = computed(() => this.store.detailCache()[this.slug()]);
  /** Reference solution stays hidden until the candidate asks for it (reset when navigating to another problem). */
  solutionRevealed = signal(false);

  constructor() {
    effect(() => {
      const slug = this.slug();
      untracked(() => {
        this.store.loadDetail(slug);
        this.solutionRevealed.set(false);
      });
    });
  }

  /** Open a new chat thread about this design problem. */
  practice(d: DesignDetail, kind: 'interview' | 'coach'): void {
    this.chatStore.newThread();
    this.chatStore.setMode(kind === 'interview' ? 'mock-interview' : 'free-chat');
    const message = kind === 'interview'
      ? `Run a mock design interview with me on "${d.title}" (${d.categoryLabel}, ${d.difficulty}). Start with the problem statement and let me ask clarifying questions.`
      : `Coach me through designing "${d.title}" (${d.categoryLabel}). Don't give me the answer — guide me step by step, starting with requirements.`;
    this.router.navigate(['/chat']);
    this.chatStore.send(message, this.modelsStore.selectedModelId(), { designSlug: d.slug });
  }
}
