import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatUiEnvelope } from '../../../core/models/chat.model';
import { CHAT_COMPONENT_REGISTRY, FALLBACK_COMPONENT } from '../component-registry';

@Component({
  selector: 'app-chat-component-host',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (def()) {
      <ng-container *ngComponentOutlet="def()!.component; inputs: resolvedInputs()" />
    }
  `,
})
export class ChatComponentHostComponent {
  ui = input.required<ChatUiEnvelope>();

  readonly def = computed(() => {
    const name = this.ui().component;
    return CHAT_COMPONENT_REGISTRY[name] ?? CHAT_COMPONENT_REGISTRY[FALLBACK_COMPONENT];
  });

  /** Only pass declared inputs -- setInput() on an undeclared input throws NG0303. */
  readonly resolvedInputs = computed<Record<string, unknown>>(() => {
    const inputs = this.ui().inputs ?? {};
    const out: Record<string, unknown> = {};
    for (const key of this.def().inputKeys) {
      if (inputs[key] !== undefined && inputs[key] !== null) out[key] = inputs[key];
    }
    return out;
  });
}
