import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DESIGN_CATEGORY_ICONS, DESIGN_CATEGORY_LABELS } from '../../../../core/models/design.model';

export interface DesignCard {
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  seniority?: string | null;
  companies: string[];
  why: string;
}

@Component({
  selector: 'app-chat-design-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule],
  templateUrl: './chat-design-list.component.html',
  styleUrl: './chat-design-list.component.scss',
})
export class ChatDesignListComponent {
  designProblems = input<DesignCard[]>([]);

  categoryLabel(id: string): string {
    return DESIGN_CATEGORY_LABELS[id] ?? id;
  }

  icon(id: string): string {
    return DESIGN_CATEGORY_ICONS[id] ?? 'architecture';
  }
}
