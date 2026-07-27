import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProblemsStore } from '../../state/problems.store';
import { FiltersStore } from '../../state/filters.store';

@Component({
  selector: 'app-problems-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatCardModule, MatChipsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatProgressBarModule,
  ],
  template: `
    <div class="problems-page">
      <aside class="filter-panel">
        <h3>Filters</h3>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Search</mat-label>
          <input matInput [ngModel]="filtersStore.selected().q"
                 (ngModelChange)="filtersStore.setQuery($event)" placeholder="Search problems...">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Difficulty</mat-label>
          <mat-select [ngModel]="filtersStore.selected().difficulties" (ngModelChange)="filtersStore.setDifficulties($event)" multiple>
            @for (d of filtersStore.difficulties(); track d) {
              <mat-option [value]="d">{{ d }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Topics</mat-label>
          <mat-select [ngModel]="filtersStore.selected().topics" (ngModelChange)="filtersStore.setTopics($event)" multiple>
            @for (t of filtersStore.topics(); track t.id) {
              <mat-option [value]="t.id">{{ t.label }} ({{ t.problemCount }})</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Companies</mat-label>
          <mat-select [ngModel]="filtersStore.selected().companies" (ngModelChange)="filtersStore.setCompanies($event)" multiple>
            @for (c of filtersStore.companies(); track c.slug) {
              <mat-option [value]="c.slug">{{ c.name }} ({{ c.problemCount }})</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Seniority</mat-label>
          <mat-select [ngModel]="filtersStore.selected().seniority" (ngModelChange)="filtersStore.setSeniority($event)">
            <mat-option [value]="null">Any</mat-option>
            @for (s of filtersStore.seniority(); track s) {
              <mat-option [value]="s">{{ s }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Match Mode</mat-label>
          <mat-select [ngModel]="filtersStore.selected().matchMode" (ngModelChange)="filtersStore.setMatchMode($event)">
            <mat-option value="any">Any filter</mat-option>
            <mat-option value="all">All filters</mat-option>
          </mat-select>
        </mat-form-field>

        @if (filtersStore.hasActiveFilters()) {
          <button mat-stroked-button (click)="filtersStore.reset()">
            <mat-icon>clear</mat-icon> Clear Filters
          </button>
        }
      </aside>

      <section class="results">
        @if (problemsStore.status() === 'loading') {
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        }

        @if (problemsStore.status() === 'error') {
          <mat-card class="error-card">
            <mat-card-content>Error: {{ problemsStore.error() }}</mat-card-content>
          </mat-card>
        }

        <div class="problem-grid">
          @for (p of problemsStore.items(); track p.slug) {
            <mat-card class="problem-card" [routerLink]="['/problems', p.slug]">
              <mat-card-header>
                <mat-card-title>
                  @if (p.leetcodeId) {
                    <span class="lc-id">#{{ p.leetcodeId }}</span>
                  }
                  {{ p.title }}
                </mat-card-title>
                <mat-card-subtitle>
                  <span [class]="'difficulty-' + p.difficulty.toLowerCase()">{{ p.difficulty }}</span>
                  <span class="topic">{{ p.primaryTopic }}</span>
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                @if (p.oneLiner) {
                  <p class="one-liner">{{ p.oneLiner }}</p>
                }
                <div class="chips">
                  @for (t of p.topics.slice(0, 3); track t) {
                    <mat-chip-set>
                      <mat-chip>{{ t }}</mat-chip>
                    </mat-chip-set>
                  }
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>

        @if (problemsStore.emptyBecauseTooNarrow()) {
          <div class="empty-state">
            <mat-icon>search_off</mat-icon>
            <p>No problems match your filters. Try broadening your search.</p>
          </div>
        }

        <mat-paginator
          [length]="problemsStore.total()"
          [pageSize]="problemsStore.pageSize()"
          [pageIndex]="problemsStore.page() - 1"
          [pageSizeOptions]="[10, 25, 50]"
          (page)="onPage($event)"
          showFirstLastButtons>
        </mat-paginator>
      </section>
    </div>
  `,
  styles: [`
    .problems-page {
      display: flex;
      gap: 1.5rem;
    }
    .filter-panel {
      width: 280px;
      flex-shrink: 0;
    }
    .filter-panel h3 { margin-top: 0; }
    .full-width { width: 100%; }
    .results { flex: 1; min-width: 0; }
    .problem-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .problem-card {
      cursor: pointer;
      transition: box-shadow 0.2s;
    }
    .problem-card:hover {
      box-shadow: 0 4px 20px color-mix(in srgb, currentColor 12%, transparent);
    }
    .lc-id {
      opacity: 0.5;
      margin-right: 0.5rem;
    }
    .topic {
      margin-left: 0.75rem;
      opacity: 0.7;
    }
    .one-liner {
      font-size: 0.875rem;
      opacity: 0.8;
      margin-bottom: 0.5rem;
    }
    .chips { display: flex; gap: 0.25rem; flex-wrap: wrap; }
    .empty-state {
      text-align: center;
      padding: 3rem;
      opacity: 0.6;
    }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .error-card { margin-bottom: 1rem; color: #f44336; }
    @media (max-width: 768px) {
      .problems-page { flex-direction: column; }
      .filter-panel { width: 100%; }
    }
  `],
})
export class ProblemsListComponent implements OnInit {
  readonly problemsStore = inject(ProblemsStore);
  readonly filtersStore = inject(FiltersStore);

  constructor() {
    effect(() => {
      const params = this.filtersStore.queryParams();
      this.problemsStore.load(params);
    });
  }

  ngOnInit(): void {
    this.filtersStore.loadOptions();
  }

  onPage(event: PageEvent): void {
    this.problemsStore.setPage(event.pageIndex + 1);
    this.problemsStore.setPageSize(event.pageSize);
    this.problemsStore.load(this.filtersStore.queryParams());
  }
}
