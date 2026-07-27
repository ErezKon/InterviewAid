import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SubjectsStore } from '../../../state/subjects.store';

@Component({
  selector: 'app-subjects-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatChipsModule, MatPaginatorModule, MatProgressBarModule,
  ],
  templateUrl: './subjects-list.component.html',
  styleUrl: './subjects-list.component.scss',
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
