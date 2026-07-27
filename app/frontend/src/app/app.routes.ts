import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'problems', pathMatch: 'full' },
  {
    path: 'problems',
    loadComponent: () =>
      import('./features/problems/problems-list.component').then(m => m.ProblemsListComponent),
  },
  {
    path: 'problems/:slug',
    loadComponent: () =>
      import('./features/problems/problem-detail.component').then(m => m.ProblemDetailComponent),
  },
  {
    path: 'subjects',
    loadComponent: () =>
      import('./features/subjects/subjects-list.component').then(m => m.SubjectsListComponent),
  },
  {
    path: 'subjects/:id',
    loadComponent: () =>
      import('./features/subjects/subject-detail.component').then(m => m.SubjectDetailComponent),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/chat-page.component').then(m => m.ChatPageComponent),
  },
  {
    path: 'chat/:threadId',
    loadComponent: () =>
      import('./features/chat/chat-page.component').then(m => m.ChatPageComponent),
  },
  { path: '**', redirectTo: 'problems' },
];
