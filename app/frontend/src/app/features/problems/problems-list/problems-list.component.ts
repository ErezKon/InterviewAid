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
import { ProblemsStore } from '../../../state/problems.store';
import { FiltersStore } from '../../../state/filters.store';

@Component({
  selector: 'app-problems-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatCardModule, MatChipsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './problems-list.component.html',
  styleUrl: './problems-list.component.scss',
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
