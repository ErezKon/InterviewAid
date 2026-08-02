import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownService } from '../../../../core/services/markdown.service';

export interface EnrichmentItem {
  file: string;
  status: 'enriched' | 'skipped' | 'failed';
  notes: string;
}

export interface Enrichment {
  filesScanned: number;
  filesEnriched: number;
  auditSummary: string;
  items: EnrichmentItem[];
}

@Component({
  selector: 'app-chat-enrichment-report',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './chat-enrichment-report.component.html',
  styleUrl: './chat-enrichment-report.component.scss',
})
export class ChatEnrichmentReportComponent {
  enrichment = input<Enrichment>();

  private md = inject(MarkdownService);

  renderMd(text: string): string {
    return this.md.render(text);
  }

  statusIcon(status: string): string {
    switch (status) {
      case 'enriched': return 'check_circle';
      case 'skipped': return 'remove_circle';
      case 'failed': return 'error';
      default: return 'help';
    }
  }

  statusClass(status: string): string {
    return 'status-' + status;
  }
}
