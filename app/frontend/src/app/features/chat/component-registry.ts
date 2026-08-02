import { Type } from '@angular/core';
import { ChatComponentName } from '../../core/models/chat.model';
import { ChatTextComponent } from './components/chat-text/chat-text.component';
import { ChatMarkdownViewerComponent } from './chat-markdown-viewer/chat-markdown-viewer.component';
import { ChatQuizCardsComponent } from './chat-quiz-cards/chat-quiz-cards.component';
import { ChatProblemListComponent } from './components/chat-problem-list/chat-problem-list.component';
import { ChatHintCardComponent } from './components/chat-hint-card/chat-hint-card.component';
import { ChatInterviewQuestionComponent } from './components/chat-interview-question/chat-interview-question.component';
import { ChatEvaluationScorecardComponent } from './components/chat-evaluation-scorecard/chat-evaluation-scorecard.component';
import { ChatEnrichmentReportComponent } from './components/chat-enrichment-report/chat-enrichment-report.component';

export interface ChatComponentDef {
  component: Type<unknown>;
  /** Envelope `inputs` keys this component accepts. The host passes ONLY these,
   *  because ComponentRef.setInput() throws for undeclared inputs. */
  inputKeys: string[];
}

/** Must stay in sync with CHAT_COMPONENTS in
 *  app/backend/src/agents/shared/ui-response.schema.ts */
export const CHAT_COMPONENT_REGISTRY: Record<ChatComponentName, ChatComponentDef> = {
  'text':                      { component: ChatTextComponent,               inputKeys: [] },
  'chat-markdown-viewer':      { component: ChatMarkdownViewerComponent,     inputKeys: ['content', 'title'] },
  'chat-quiz-cards':           { component: ChatQuizCardsComponent,          inputKeys: ['questions', 'studyTips', 'subject'] },
  'chat-problem-list':         { component: ChatProblemListComponent,        inputKeys: ['problems', 'interpretedFilters'] },
  'chat-hint-card':            { component: ChatHintCardComponent,           inputKeys: ['hints', 'problemTitle'] },
  'chat-interview-question':   { component: ChatInterviewQuestionComponent,  inputKeys: ['stage', 'questionText', 'currentProblemSlug', 'hintsGiven', 'sessionProgress', 'nextAction'] },
  'chat-evaluation-scorecard': { component: ChatEvaluationScorecardComponent, inputKeys: ['evaluation'] },
  'chat-enrichment-report':    { component: ChatEnrichmentReportComponent,   inputKeys: ['enrichment'] },
};

export const FALLBACK_COMPONENT: ChatComponentName = 'text';
