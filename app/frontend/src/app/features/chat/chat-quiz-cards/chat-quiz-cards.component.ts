import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

export interface ChatQuizQuestion {
  id: string;
  subjectId?: string;
  type: 'open' | 'multiple-choice';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  expectedAnswer: string;
  referenceQuote: string;
  followUp?: string;
}

interface CardState {
  revealed: boolean;
  selectedOptionIndex: number | null;
  correct: boolean | null;
}

@Component({
  selector: 'app-chat-quiz-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatDividerModule,
  ],
  templateUrl: './chat-quiz-cards.component.html',
  styleUrl: './chat-quiz-cards.component.scss',
})
export class ChatQuizCardsComponent {
  questions = input.required<ChatQuizQuestion[]>();
  studyTips = input<string[]>([]);
  subject = input<{ id: string; title: string; sourceFile: string }>();

  cardStates = signal<Map<string, CardState>>(new Map());

  getState(qId: string): CardState {
    return this.cardStates().get(qId) ?? { revealed: false, selectedOptionIndex: null, correct: null };
  }

  selectOption(q: ChatQuizQuestion, index: number): void {
    const state = this.getState(q.id);
    if (state.revealed) return;
    if (!q.options) return;
    const selectedText = q.options[index];
    const isCorrect = q.expectedAnswer.includes(selectedText);
    const updated = new Map(this.cardStates());
    updated.set(q.id, { revealed: true, selectedOptionIndex: index, correct: isCorrect });
    this.cardStates.set(updated);
  }

  revealAnswer(q: ChatQuizQuestion): void {
    const state = this.getState(q.id);
    if (state.revealed) return;
    const updated = new Map(this.cardStates());
    updated.set(q.id, { revealed: true, selectedOptionIndex: null, correct: null });
    this.cardStates.set(updated);
  }

  markAnswer(q: ChatQuizQuestion, correct: boolean): void {
    const updated = new Map(this.cardStates());
    updated.set(q.id, { ...this.getState(q.id), correct });
    this.cardStates.set(updated);
  }

  isCorrectOption(q: ChatQuizQuestion, opt: string): boolean {
    return q.expectedAnswer.includes(opt);
  }

  get score(): { answered: number; correct: number } {
    let answered = 0;
    let correct = 0;
    for (const s of this.cardStates().values()) {
      if (s.correct !== null) {
        answered++;
        if (s.correct) correct++;
      }
    }
    return { answered, correct };
  }
}
