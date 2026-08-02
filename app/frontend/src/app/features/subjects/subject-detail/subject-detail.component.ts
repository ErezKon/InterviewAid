import { Component, inject, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubjectsStore } from '../../../state/subjects.store';
import { ChatMarkdownViewerComponent } from '../../chat/chat-markdown-viewer/chat-markdown-viewer.component';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    ChatMarkdownViewerComponent,
  ],
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.scss',
})
export class SubjectDetailComponent implements OnInit {
  id = input.required<string>();

  readonly store = inject(SubjectsStore);

  ngOnInit(): void {
    this.store.loadDetail(this.id());
  }
}
