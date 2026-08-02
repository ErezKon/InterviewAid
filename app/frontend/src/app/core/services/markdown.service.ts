import { Injectable } from '@angular/core';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const markedInstance = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code: string, lang: string) {
      // Don't highlight mermaid blocks — they'll be rendered as diagrams
      if (lang === 'mermaid') return code;
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  }),
  {
    renderer: {
      code({ text, lang }: { text: string; lang?: string }) {
        if (lang === 'mermaid') {
          return `<pre class="mermaid">${text}</pre>`;
        }
        return false as unknown as string; // fall through to default renderer
      },
    },
  },
);

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  render(md: string | null | undefined): string {
    if (!md) return '';
    return markedInstance.parse(md) as string;
  }
}
