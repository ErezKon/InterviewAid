import { Component, inject, OnInit, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubjectsStore } from '../../../state/subjects.store';
import { MarkdownService } from '../../../core/services/markdown.service';
import { MermaidDirective } from '../../../core/directives/mermaid.directive';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MermaidDirective
  ],
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.scss',
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
