import { Injectable } from '@angular/core';
import { marked } from 'marked';
import hljs from 'highlight.js';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  constructor() {
    marked.setOptions({
      highlight: (code: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
    } as any);
  }

  render(md: string | null | undefined): string {
    if (!md) return '';
    return marked.parse(md) as string;
  }
}
