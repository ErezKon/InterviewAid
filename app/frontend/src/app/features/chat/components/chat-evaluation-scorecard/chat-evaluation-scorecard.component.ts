import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface Evaluation {
  correctness: number;
  complexity: number;
  communication: number;
  edgeCases: number;
  notes: string;
}

@Component({
  selector: 'app-chat-evaluation-scorecard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './chat-evaluation-scorecard.component.html',
  styleUrl: './chat-evaluation-scorecard.component.scss',
})
export class ChatEvaluationScorecardComponent {
  evaluation = input<Evaluation>();

  readonly axes = computed(() => {
    const e = this.evaluation();
    if (!e) return [];
    return [
      { label: 'Correctness', score: e.correctness },
      { label: 'Complexity', score: e.complexity },
      { label: 'Communication', score: e.communication },
      { label: 'Edge Cases', score: e.edgeCases },
    ];
  });

  readonly average = computed(() => {
    const e = this.evaluation();
    if (!e) return 0;
    return (e.correctness + e.complexity + e.communication + e.edgeCases) / 4;
  });
}
