import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { QuizStore } from '../../../state/quiz.store';
import { MarkdownService } from '../../../core/services/markdown.service';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, MatButtonModule, MatIconModule, MatCheckboxModule,
    MatChipsModule, MatProgressBarModule, MatExpansionModule,
    MatRadioModule, MatBadgeModule, MatDividerModule,
  ],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
})
export class QuizPageComponent implements OnInit {
  readonly store = inject(QuizStore);
  private md = inject(MarkdownService);

  ngOnInit(): void {
    this.store.loadStats();
  }

  renderMd(text: string | null | undefined): string {
    return this.md.render(text);
  }

  isSubjectSelected(id: string): boolean {
    return this.store.selectedSubjectIds().includes(id);
  }

  isGroupFullySelected(mainSubject: string): boolean {
    const group = this.store.stats().find(g => g.mainSubject === mainSubject);
    if (!group) return false;
    const eligible = group.subjects.filter(s => s.questionCount > 0);
    if (eligible.length === 0) return false;
    const selected = new Set(this.store.selectedSubjectIds());
    return eligible.every(s => selected.has(s.id));
  }

  getDifficultyClass(difficulty: string): string {
    return `difficulty-${difficulty}`;
  }

  getProgressPercent(): number {
    const total = this.store.totalQuestions();
    return total > 0 ? (this.store.progress() / total) * 100 : 0;
  }

  getScorePercent(): number {
    const total = this.store.answers().length;
    return total > 0 ? Math.round((this.store.correctCount() / total) * 100) : 0;
  }
}
