import { Component, input, linkedSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topic-spoiler',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './topic-spoiler.component.html',
  styleUrl: './topic-spoiler.component.scss',
})
export class TopicSpoilerComponent {
  topics = input<string[]>([]);
  label = input('Show topic');

  revealed = linkedSignal({ source: this.topics, computation: () => false });

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.revealed.update(v => !v);
  }
}
