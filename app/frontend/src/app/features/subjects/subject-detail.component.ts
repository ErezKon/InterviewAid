import { Component, inject, OnInit, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubjectsStore } from '../../state/subjects.store';
import { MarkdownService } from '../../core/services/markdown.service';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
  ],
  template: `
    <div class="detail-page">
      <a mat-button routerLink="/subjects">
        <mat-icon>arrow_back</mat-icon> Back to Subjects
      </a>

      @if (store.currentDetail(); as d) {
        <mat-card class="detail-card">
          <mat-card-header>
            <mat-card-title>{{ d.title }}</mat-card-title>
            <mat-card-subtitle>{{ d.wordCount }} words</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="markdown-body" [innerHTML]="renderedBody()"></div>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="loading">
          <mat-spinner diameter="48"></mat-spinner>
        </div>
      }
    </div>
  `,
  styles: [`
    .detail-page { max-width: 900px; margin: 0 auto; }
    .detail-card { margin-top: 1rem; }
    .loading { display: flex; justify-content: center; padding: 3rem; }
  `],
})
export class SubjectDetailComponent implements OnInit {
  id = input.required<string>();

  readonly store = inject(SubjectsStore);
  private md = inject(MarkdownService);

  renderedBody = computed(() => {
    const d = this.store.currentDetail();
    return d ? this.md.render(d.bodyMd) : '';
  });

  ngOnInit(): void {
    this.store.loadDetail(this.id());
  }
}
