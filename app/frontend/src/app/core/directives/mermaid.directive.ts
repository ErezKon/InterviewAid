import {
  Directive,
  ElementRef,
  AfterViewChecked,
  OnDestroy,
  inject,
} from '@angular/core';
import mermaid from 'mermaid';

let mermaidInitialized = false;

@Directive({
  selector: '[appMermaid]',
  standalone: true,
})
export class MermaidDirective implements AfterViewChecked, OnDestroy {
  private el = inject(ElementRef);
  private rendered = new WeakSet<Element>();
  private mutationObserver: MutationObserver | null = null;

  constructor() {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
      });
      mermaidInitialized = true;
    }

    this.mutationObserver = new MutationObserver(() => this.renderMermaid());
    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  ngAfterViewChecked(): void {
    this.renderMermaid();
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
  }

  private async renderMermaid(): Promise<void> {
    const container: HTMLElement = this.el.nativeElement;
    const nodes = container.querySelectorAll<HTMLPreElement>('pre.mermaid');
    const toRender: HTMLElement[] = [];

    for (const node of Array.from(nodes)) {
      if (!this.rendered.has(node)) {
        this.rendered.add(node);
        toRender.push(node);
      }
    }

    if (toRender.length > 0) {
      await mermaid.run({ nodes: toRender });
    }
  }
}
