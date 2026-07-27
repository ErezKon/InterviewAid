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
import { ChatStore } from '../../state/chat.store';
import { ModelsStore } from '../../state/models.store';
import { MarkdownService } from '../../core/services/markdown.service';
import { ChatMode } from '../../core/models/chat.model';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatListModule, MatProgressBarModule,
    MatSidenavModule, MatMenuModule, MatTooltipModule, ClipboardModule,
  ],
  template: `
    <mat-sidenav-container class="chat-container">
      <mat-sidenav mode="side" opened class="thread-sidebar">
        <div class="sidebar-header">
          <h3>Threads</h3>
          <button mat-icon-button (click)="chatStore.newThread()">
            <mat-icon>add</mat-icon>
          </button>
        </div>
        <mat-nav-list>
          @for (t of chatStore.threads(); track t.id) {
            <mat-list-item
              [class.active]="t.id === chatStore.activeThreadId()"
              (click)="chatStore.loadThread(t.id)">
              <span matListItemTitle>{{ t.title ?? 'Untitled' }}</span>
              <span matListItemMeta>
                <button mat-icon-button (click)="chatStore.deleteThread(t.id); $event.stopPropagation()">
                  <mat-icon>delete</mat-icon>
                </button>
              </span>
            </mat-list-item>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="chat-main">
        <div class="chat-controls">
          <mat-form-field appearance="outline" class="mode-select">
            <mat-label>Mode</mat-label>
            <mat-select [ngModel]="chatStore.mode()" (ngModelChange)="chatStore.setMode($event)">
              <mat-option value="auto">Auto</mat-option>
              <mat-option value="find-problems">Find Problems</mat-option>
              <mat-option value="mock-interview">Mock Interview</mat-option>
              <mat-option value="subject-quiz">Subject Quiz</mat-option>
              <mat-option value="content-enricher">Content Enricher</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="model-select">
            <mat-label>Model</mat-label>
            <mat-select [ngModel]="modelsStore.selectedModelId()" (ngModelChange)="modelsStore.selectModel($event)">
              @for (m of modelsStore.models(); track m.id) {
                <mat-option [value]="m.id">{{ m.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

        @if (chatStore.streaming()) {
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        }

        <div class="messages" #messagesContainer>
          @for (msg of chatStore.messages(); track msg.id) {
            <div class="message" [class]="'message-' + msg.role">
              <div class="message-header">
                <span class="message-role">{{ msg.role === 'user' ? 'You' : 'Assistant' }}</span>
                @if (msg.content && !msg.streaming) {
                  <button mat-icon-button
                    class="copy-btn"
                    matTooltip="Copy to clipboard"
                    (click)="copyMessage(msg.content)">
                    <mat-icon>content_copy</mat-icon>
                  </button>
                }
              </div>
              <div class="message-content markdown-body" [innerHTML]="renderMd(msg.content)"></div>
              @if (msg.streaming) {
                <span class="typing-indicator">...</span>
              }
            </div>
          }
        </div>

        <div class="composer">
          <mat-form-field appearance="outline" class="composer-input">
            <mat-label>Message</mat-label>
            <textarea matInput
              [(ngModel)]="userInput"
              (keydown.enter)="onSend($event)"
              placeholder="Ask about problems, request a mock interview..."
              rows="2"
              [disabled]="chatStore.streaming()">
            </textarea>
          </mat-form-field>

          <button mat-fab color="primary"
            [disabled]="chatStore.streaming() || !userInput().trim()"
            (click)="sendMessage()">
            @if (chatStore.streaming()) {
              <mat-icon (click)="chatStore.abort(); $event.stopPropagation()">stop</mat-icon>
            } @else {
              <mat-icon>send</mat-icon>
            }
          </button>
        </div>

        @if (chatStore.error()) {
          <div class="error-banner">{{ chatStore.error() }}</div>
        }
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .chat-container { height: calc(100vh - 64px - 3rem); }
    .thread-sidebar { width: 260px; }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
    }
    .sidebar-header h3 { margin: 0; }
    mat-list-item.active { background: color-mix(in srgb, currentColor 8%, transparent); }
    .chat-main {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .chat-controls {
      display: flex;
      gap: 1rem;
      padding: 0.5rem 1rem;
      flex-shrink: 0;
    }
    .mode-select, .model-select { flex: 1; max-width: 250px; }
    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .message {
      padding: 0.75rem 1rem;
      border-radius: 12px;
      max-width: 80%;
    }
    .message-user {
      background: var(--chat-user-bg, #e3f2fd);
      align-self: flex-end;
    }
    .message-assistant {
      background: var(--chat-assistant-bg, #f5f5f5);
      align-self: flex-start;
    }
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
    }
    .message-role {
      font-size: 0.75rem;
      font-weight: 600;
      opacity: 0.6;
    }
    .copy-btn {
      width: 28px;
      height: 28px;
      line-height: 28px;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .copy-btn .mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    .message:hover .copy-btn {
      opacity: 0.6;
    }
    .message:hover .copy-btn:hover {
      opacity: 1;
    }
    .typing-indicator {
      animation: blink 1s infinite;
      font-size: 1.5rem;
      line-height: 1;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    .composer {
      display: flex;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      align-items: flex-end;
      flex-shrink: 0;
      border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent);
    }
    .composer-input { flex: 1; }
    .error-banner {
      background: var(--chat-error-bg, #ffebee);
      color: var(--chat-error-text, #c62828);
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin: 0 1rem 0.5rem;
    }
  `],
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
}
