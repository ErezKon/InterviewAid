import { Component, inject, OnInit, signal, ViewChild, ElementRef, AfterViewChecked, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { ChatStore } from '../../../state/chat.store';
import { ModelsStore } from '../../../state/models.store';
import { MarkdownService } from '../../../core/services/markdown.service';
import { MermaidDirective } from '../../../core/directives/mermaid.directive';
import { ChatMode, ChatMessage } from '../../../core/models/chat.model';
import { ChatQuizCardsComponent } from '../chat-quiz-cards/chat-quiz-cards.component';
import { ChatMarkdownViewerComponent } from '../chat-markdown-viewer/chat-markdown-viewer.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatListModule, MatProgressBarModule,
    MatSidenavModule, MatMenuModule, MatTooltipModule, ClipboardModule,
    MermaidDirective, ChatQuizCardsComponent, ChatMarkdownViewerComponent,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit, AfterViewChecked {
  readonly chatStore = inject(ChatStore);
  readonly modelsStore = inject(ModelsStore);
  private md = inject(MarkdownService);
  private clipboard = inject(Clipboard);

  threadId = input<string>();
  userInput = signal('');

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  private shouldScroll = false;
  private resolvedDataCache = new Map<string, any>();

  ngOnInit(): void {
    this.chatStore.loadThreads();
    this.modelsStore.load();
    const tid = this.threadId();
    if (tid) {
      this.chatStore.loadThread(tid);
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll && this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.shouldScroll = false;
    }
  }

  renderMd(text: string | null | undefined): string {
    return this.md.render(text);
  }

  onSend(event: Event): void {
    if (!(event as KeyboardEvent).shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const text = this.userInput().trim();
    if (!text) return;
    this.userInput.set('');
    this.shouldScroll = true;
    this.chatStore.send(text, this.modelsStore.selectedModelId());
  }

  copyMessage(content: string): void {
    this.clipboard.copy(content);
  }

  /**
   * Resolve any structured data from a message (quiz, explain, clarify, etc.).
   * Priority: msg.structured (object) → parse msg.structured (string) →
   * parse msg.payloadJson → extract JSON from msg.content.
   */
  private resolveAnyStructured(msg: ChatMessage): any | null {
    if (this.resolvedDataCache.has(msg.id)) {
      return this.resolvedDataCache.get(msg.id);
    }

    let result: any | null = null;

    if (msg.structured && typeof msg.structured === 'object') {
      result = msg.structured;
    }
    if (!result && typeof msg.structured === 'string') {
      const parsed = this.tryParseJson(msg.structured);
      if (parsed && typeof parsed === 'object') result = parsed;
    }
    if (!result && msg.payloadJson) {
      const parsed = this.tryParseJson(msg.payloadJson);
      if (parsed && typeof parsed === 'object') result = parsed;
    }
    if (!result && msg.content && !msg.streaming) {
      const parsed = this.extractJsonFromContent(msg.content);
      if (parsed && typeof parsed === 'object') result = parsed;
    }

    if (!msg.streaming) {
      this.resolvedDataCache.set(msg.id, result);
    }
    return result;
  }

  /** Resolve structured quiz data (has questions). */
  private resolveQuizStructured(msg: ChatMessage): any | null {
    const data = this.resolveAnyStructured(msg);
    return data?.questions ? data : null;
  }

  private tryParseJson(text: string): any | null {
    try { return JSON.parse(text.trim()); } catch { return null; }
  }

  private extractJsonFromContent(text: string): any | null {
    // Try fenced JSON first
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      const parsed = this.tryParseJson(fenceMatch[1]);
      if (parsed) return parsed;
    }
    // Try to find a JSON object in the text
    const braceStart = text.indexOf('{');
    if (braceStart >= 0) {
      const candidate = text.slice(braceStart);
      const parsed = this.tryParseJson(candidate);
      if (parsed) return parsed;
    }
    return null;
  }

  /**
   * Build display content for the message.
   * - Quiz cards: strip JSON (the quiz component renders it)
   * - Structured text response (explain, clarify, etc.): format as markdown
   * - Otherwise: return raw content
   */
  getDisplayContent(msg: ChatMessage): string {
    // Quiz cards — strip JSON; the component renders the quiz
    if (this.hasQuizCards(msg)) {
      let cleaned = msg.content.replace(/```(?:json)?\s*[\s\S]*?```/g, '').trim();
      const braceStart = cleaned.indexOf('{');
      if (braceStart >= 0) {
        const candidate = cleaned.slice(braceStart);
        if (this.tryParseJson(candidate)) {
          cleaned = cleaned.slice(0, braceStart).trim();
        }
      }
      return cleaned;
    }

    // Structured text response (explain, clarify, find_problems with subjects, etc.)
    const structured = this.resolveAnyStructured(msg);
    if (structured && (structured.summary || structured.intent)) {
      return this.formatStructuredAsMarkdown(structured);
    }

    return msg.content;
  }

  /** Format a structured agent response into readable markdown. */
  private formatStructuredAsMarkdown(data: any): string {
    const parts: string[] = [];

    if (data.summary) {
      parts.push(data.summary);
    }

    if (data.subjects?.length) {
      parts.push('');
      for (const s of data.subjects) {
        const source = s.sourceFile ? ` — \`${s.sourceFile}\`` : '';
        parts.push(`- **${s.title}**${source}`);
      }
    }

    if (data.problems?.length) {
      parts.push('');
      for (const p of data.problems) {
        const diff = p.difficulty ? ` (${p.difficulty})` : '';
        const why = p.why ? ` — ${p.why}` : '';
        parts.push(`- **${p.title}**${diff}${why}`);
      }
    }

    if (data.hints?.length) {
      parts.push('');
      for (const h of data.hints) {
        parts.push(`> **Hint ${h.level}:** ${h.text}`);
      }
    }

    // Render remaining content properties that aren't handled above
    const handled = new Set([
      'intent', 'summary', 'interpretedFilters', 'problems', 'subjects',
      'hints', 'followUpSuggestions', 'questions', 'studyTips', 'subjectContent',
      'subject', 'sessionProgress', 'stage', 'nextAction',
    ]);
    for (const [key, value] of Object.entries(data)) {
      if (handled.has(key) || value == null) continue;

      if (typeof value === 'string' && value.length > 0) {
        parts.push('');
        parts.push(`### ${this.humanizeKey(key)}`);
        parts.push(value);
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
        parts.push('');
        parts.push(`### ${this.humanizeKey(key)}`);
        for (const item of value) {
          parts.push(`- ${item}`);
        }
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Key-value map (e.g. summaryDetails)
        parts.push('');
        for (const [subKey, subValue] of Object.entries(value as Record<string, unknown>)) {
          if (typeof subValue === 'string') {
            parts.push(`**${subKey}:** ${subValue}\n`);
          }
        }
      }
    }

    return parts.join('\n');
  }

  /** Convert camelCase key to a human-readable heading. */
  private humanizeKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim();
  }

  hasQuizCards(msg: ChatMessage): boolean {
    return !!this.resolveQuizStructured(msg);
  }

  getQuizQuestions(msg: ChatMessage): any[] {
    return this.resolveQuizStructured(msg)?.questions ?? [];
  }

  getStudyTips(msg: ChatMessage): string[] {
    return this.resolveQuizStructured(msg)?.studyTips ?? [];
  }

  hasSubjectContent(msg: ChatMessage): boolean {
    const structured = this.resolveAnyStructured(msg);
    return !!(structured?.subjectContent);
  }

  getSubjectContent(msg: ChatMessage): string {
    return this.resolveAnyStructured(msg)?.subjectContent ?? '';
  }

  getFollowUpSuggestions(msg: ChatMessage): string[] {
    if (msg.streaming) return [];
    const structured = this.resolveAnyStructured(msg);
    return structured?.followUpSuggestions ?? [];
  }

  sendFollowUp(text: string): void {
    this.userInput.set(text);
    this.sendMessage();
  }
}
