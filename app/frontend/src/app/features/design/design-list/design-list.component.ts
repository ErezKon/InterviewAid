import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DesignStore } from '../../../state/design.store';
import { DesignApi } from '../../../core/api/design.api';
import { DESIGN_CATEGORY_ICONS } from '../../../core/models/design.model';

@Component({
  selector: 'app-design-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressBarModule,
  ],
  templateUrl: './design-list.component.html',
  styleUrl: './design-list.component.scss',
})
export class DesignListComponent implements OnInit {
  readonly store = inject(DesignStore);
  private api = inject(DesignApi);
  private router = inject(Router);

  readonly difficulties = ['Easy', 'Medium', 'Hard'];
  readonly seniorities = ['junior', 'mid', 'senior', 'staff'];

  constructor() {
    effect(() => {
      this.store.filters();
      this.store.load();
    });
  }

  ngOnInit(): void {
    this.store.loadCategories();
  }

  icon(categoryId: string): string {
    return DESIGN_CATEGORY_ICONS[categoryId] ?? 'architecture';
  }

  randomProblem(): void {
    const f = this.store.filters();
    this.api.getRandom({ categories: f.categories, difficulties: f.difficulties, seniority: f.seniority })
      .subscribe({ next: item => this.router.navigate(['/design', item.slug]) });
  }
}
