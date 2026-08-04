import { Component, computed, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadStore } from '../../../state/upload.store';
import { FiltersStore } from '../../../state/filters.store';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [
    CommonModule, RouterLink, JsonPipe,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatSlideToggleModule, MatButtonToggleModule, MatProgressBarModule,
  ],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss',
})
export class UploadPageComponent {
  readonly store = inject(UploadStore);
  private filtersStore = inject(FiltersStore);

  readonly taxonomyOptions = computed(() =>
    this.filtersStore.topics().map(t => ({ id: t.id, label: t.label }))
  );

  readonly canSubmit = computed(() =>
    this.store.files().length > 0 && this.store.title().trim().length > 0
  );

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropped = Array.from(event.dataTransfer?.files ?? []).filter(f => f.name.endsWith('.md'));
    if (dropped.length) {
      this.store.setFiles([...this.store.files(), ...dropped]);
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const selected = Array.from(input.files ?? []);
    if (selected.length) {
      this.store.setFiles([...this.store.files(), ...selected]);
    }
    input.value = '';
  }

  removeFile(file: File) {
    this.store.setFiles(this.store.files().filter(f => f !== file));
  }
}
