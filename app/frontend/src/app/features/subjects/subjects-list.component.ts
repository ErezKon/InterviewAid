import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SubjectsStore } from '../../state/subjects.store';

@Component({
  selector: 'app-subjects-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatChipsModule, MatPaginatorModule, MatProgressBarModule,
  ],
  template: `
    <h2>Study Subjects</h2>

    @if (store.status() === 'loading') {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }

    <div class="subjects-grid">
      @for (s of store.items(); track s.id) {
        <mat-card class="subject-card" [routerLink]="['/subjects', s.id]">
          <mat-card-header>
            <mat-card-title>{{ s.title }}</mat-card-title>
            <mat-card-subtitle>{{ s.wordCount }} words</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="chips">
              @for (c of s.keyConcepts.slice(0, 5); track c) {
                <mat-chip-set><mat-chip>{{ c }}</mat-chip></mat-chip-set>
              }
            </div>
          </mat-card-content>
        </mat-card>
      }
    </div>

    <mat-paginator
      [length]="store.total()"
      [pageSize]="store.pageSize()"
      [pageIndex]="store.page() - 1"
      [pageSizeOptions]="[10, 25, 50]"
      (page)="onPage($event)"
      showFirstLastButtons>
    </mat-paginator>
  `,
  styles: [`
    .subjects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    .subject-card {
      cursor: pointer;
      transition: box-shadow 0.2s;
    }
    .subject-card:hover {
      box-shadow: 0 4px 20px color-mix(in srgb, currentColor 12%, transparent);
    }
    .chips { display: flex; gap: 0.25rem; flex-wrap: wrap; }
  `],
})
export class SubjectsListComponent implements OnInit {
  readonly store = inject(SubjectsStore);

  ngOnInit(): void {
    this.store.load();
  }

  onPage(event: PageEvent): void {
    this.store.setPage(event.pageIndex + 1);
    this.store.load();
  }
}
