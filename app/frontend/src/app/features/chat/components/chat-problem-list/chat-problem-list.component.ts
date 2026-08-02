import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

export interface ProblemCard {
  slug: string;
  title: string;
  difficulty: string;
  topics: string[];
  companies: string[];
  why: string;
}

export interface InterpretedFilters {
  companies: string[];
  difficulties: string[];
  topics: string[];
  seniority: string | null;
}

@Component({
  selector: 'app-chat-problem-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './chat-problem-list.component.html',
  styleUrl: './chat-problem-list.component.scss',
})
export class ChatProblemListComponent {
  problems = input<ProblemCard[]>([]);
  interpretedFilters = input<InterpretedFilters>();
}
