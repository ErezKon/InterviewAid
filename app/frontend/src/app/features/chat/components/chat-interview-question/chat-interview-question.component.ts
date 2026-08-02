import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownService } from '../../../../core/services/markdown.service';

@Component({
  selector: 'app-chat-interview-question',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatProgressBarModule, MatIconModule],
  templateUrl: './chat-interview-question.component.html',
  styleUrl: './chat-interview-question.component.scss',
})
export class ChatInterviewQuestionComponent {
  stage = input<string>();
  questionText = input<string>();
  currentProblemSlug = input<string | null>();
  hintsGiven = input<number>();
  sessionProgress = input<{ step: number; total: number }>();
  nextAction = input<string>();

  private md = inject(MarkdownService);

  renderMd(text: string): string {
    return this.md.render(text);
  }

  get progressPercent(): number {
    const p = this.sessionProgress();
    if (!p || !p.total) return 0;
    return (p.step / p.total) * 100;
  }

  get nextActionLabel(): string {
    switch (this.nextAction()) {
      case 'wait_for_answer': return 'Waiting for your answer...';
      case 'next_problem': return 'Moving to next problem';
      case 'end_interview': return 'Interview complete';
      default: return '';
    }
  }
}
