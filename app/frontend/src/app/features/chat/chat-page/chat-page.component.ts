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
import { ChatMode } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatListModule, MatProgressBarModule,
    MatSidenavModule, MatMenuModule, MatTooltipModule, ClipboardModule,
    MermaidDirective,
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
