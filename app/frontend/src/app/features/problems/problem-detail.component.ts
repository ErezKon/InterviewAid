import { Component, inject, OnInit, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProblemsStore } from '../../state/problems.store';
import { MarkdownService } from '../../core/services/markdown.service';

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule,
    MatExpansionModule, MatProgressSpinnerModule,
  ],
  template: `
    <div class="detail-page">
      <a mat-button routerLink="/problems">
        <mat-icon>arrow_back</mat-icon> Back to Problems
      </a>

      @if (detail(); as d) {
        <mat-card class="detail-card">
          <mat-card-header>
            <mat-card-title>
              @if (d.leetcodeId) {
                <span class="lc-id">#{{ d.leetcodeId }}</span>
              }
              {{ d.title }}
            </mat-card-title>
            <mat-card-subtitle>
              <span [class]="'difficulty-' + d.difficulty.toLowerCase()">{{ d.difficulty }}</span>
              @if (d.primaryTopic) {
                <span class="topic-badge">{{ d.primaryTopic }}</span>
              }
              @if (d.url) {
                <a [href]="d.url" target="_blank" rel="noopener" class="lc-link">LeetCode</a>
              }
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="chips-row">
              @for (t of d.topics; track t) {
                <mat-chip-set><mat-chip>{{ t }}</mat-chip></mat-chip-set>
              }
            </div>

            @if (d.descriptionMd) {
              <section>
                <h3>Description</h3>
                <div class="markdown-body" [innerHTML]="renderMd(d.descriptionMd)"></div>
              </section>
            }

            @if (d.examplesMd) {
              <section>
                <h3>Examples</h3>
                <div class="markdown-body" [innerHTML]="renderMd(d.examplesMd)"></div>
              </section>
            }

            @if (d.solutionMd) {
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Solution</mat-panel-title>
                </mat-expansion-panel-header>
                <div class="markdown-body" [innerHTML]="renderMd(d.solutionMd)"></div>
              </mat-expansion-panel>
            }

            @if (d.complexityMd) {
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Complexity Analysis</mat-panel-title>
                </mat-expansion-panel-header>
                <div class="markdown-body" [innerHTML]="renderMd(d.complexityMd)"></div>
              </mat-expansion-panel>
            }

            @if (d.followUpsMd) {
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Follow-ups</mat-panel-title>
                </mat-expansion-panel-header>
                <div class="markdown-body" [innerHTML]="renderMd(d.followUpsMd)"></div>
              </mat-expansion-panel>
            }

            @if (d.takeawayMd) {
              <section>
                <h3>Key Takeaway</h3>
                <div class="markdown-body" [innerHTML]="renderMd(d.takeawayMd)"></div>
              </section>
            }
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
    .lc-id { opacity: 0.5; margin-right: 0.5rem; }
    .topic-badge {
      margin-left: 1rem;
      background: rgba(25, 118, 210, 0.12);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
    }
    .lc-link { margin-left: 1rem; }
    .chips-row { display: flex; gap: 0.25rem; flex-wrap: wrap; margin-bottom: 1rem; }
    section { margin-bottom: 1.5rem; }
    mat-expansion-panel { margin-bottom: 1rem; }
    .loading { display: flex; justify-content: center; padding: 3rem; }
  `],
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
