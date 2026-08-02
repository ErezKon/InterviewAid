import { inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { QuizApi } from '../core/api/quiz.api';
import { QuizQuestion, QuizStatsGroup } from '../core/models/quiz.model';

type QuizStatus = 'idle' | 'loading' | 'active' | 'complete';

interface AnswerRecord {
  questionId: string;
  correct: boolean;
}

interface QuizState {
  stats: QuizStatsGroup[];
  selectedSubjectIds: string[];
  questions: QuizQuestion[];
  currentIndex: number;
  revealed: boolean;
  answers: AnswerRecord[];
  status: QuizStatus;
  error: string | null;
}

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState<QuizState>({
    stats: [],
    selectedSubjectIds: [],
    questions: [],
    currentIndex: 0,
    revealed: false,
    answers: [],
    status: 'idle',
    error: null,
  }),
  withComputed((store) => ({
    currentQuestion: computed(() => {
      const qs = store.questions();
      const idx = store.currentIndex();
      return idx >= 0 && idx < qs.length ? qs[idx] : null;
    }),
    totalQuestions: computed(() => store.questions().length),
    progress: computed(() => {
      const total = store.questions().length;
      return total > 0 ? store.currentIndex() + 1 : 0;
    }),
    selectedQuestionCount: computed(() => {
      const selectedIds = new Set(store.selectedSubjectIds());
      let count = 0;
      for (const group of store.stats()) {
        for (const s of group.subjects) {
          if (selectedIds.has(s.id)) count += s.questionCount;
        }
      }
      return count;
    }),
    correctCount: computed(() => store.answers().filter(a => a.correct).length),
    incorrectCount: computed(() => store.answers().filter(a => !a.correct).length),
    currentAnswered: computed(() => {
      const q = store.questions()[store.currentIndex()];
      if (!q) return false;
      return store.answers().some(a => a.questionId === q.id);
    }),
  })),
  withMethods((store) => {
    const api = inject(QuizApi);
    return {
      loadStats() {
        patchState(store, { status: 'loading', error: null });
        api.getStats().subscribe({
          next: (stats) => patchState(store, { stats, status: 'idle' }),
          error: (err: any) => patchState(store, {
            status: 'idle',
            error: err.message ?? 'Failed to load quiz stats',
          }),
        });
      },

      toggleSubject(id: string) {
        const current = store.selectedSubjectIds();
        const next = current.includes(id)
          ? current.filter(s => s !== id)
          : [...current, id];
        patchState(store, { selectedSubjectIds: next });
      },

      selectAllInGroup(mainSubject: string) {
        const group = store.stats().find(g => g.mainSubject === mainSubject);
        if (!group) return;
        const groupIds = group.subjects.filter(s => s.questionCount > 0).map(s => s.id);
        const current = new Set(store.selectedSubjectIds());
        const allSelected = groupIds.every(id => current.has(id));
        let next: string[];
        if (allSelected) {
          next = store.selectedSubjectIds().filter(id => !groupIds.includes(id));
        } else {
          const merged = new Set([...store.selectedSubjectIds(), ...groupIds]);
          next = Array.from(merged);
        }
        patchState(store, { selectedSubjectIds: next });
      },

      startQuiz() {
        const ids = store.selectedSubjectIds();
        if (ids.length === 0) return;
        patchState(store, { status: 'loading', error: null });
        api.getQuestions(ids).subscribe({
          next: (questions) => {
            if (questions.length === 0) {
              patchState(store, {
                status: 'idle',
                error: 'No questions available for the selected subjects. Generate questions first using the indexer.',
              });
              return;
            }
            patchState(store, {
              questions,
              currentIndex: 0,
              revealed: false,
              answers: [],
              status: 'active',
              error: null,
            });
          },
          error: (err: any) => patchState(store, {
            status: 'idle',
            error: err.message ?? 'Failed to load questions',
          }),
        });
      },

      revealAnswer() {
        patchState(store, { revealed: true });
      },

      markAnswer(correct: boolean) {
        const q = store.questions()[store.currentIndex()];
        if (!q) return;
        const existing = store.answers().filter(a => a.questionId !== q.id);
        patchState(store, {
          answers: [...existing, { questionId: q.id, correct }],
        });
      },

      nextQuestion() {
        const idx = store.currentIndex();
        if (idx < store.questions().length - 1) {
          patchState(store, { currentIndex: idx + 1, revealed: false });
        }
      },

      previousQuestion() {
        const idx = store.currentIndex();
        if (idx > 0) {
          patchState(store, { currentIndex: idx - 1, revealed: false });
        }
      },

      finishQuiz() {
        patchState(store, { status: 'complete' });
      },

      resetQuiz() {
        patchState(store, {
          questions: [],
          currentIndex: 0,
          revealed: false,
          answers: [],
          status: 'idle',
          error: null,
        });
      },

      retryQuiz() {
        const questions = [...store.questions()].sort(() => Math.random() - 0.5);
        patchState(store, {
          questions,
          currentIndex: 0,
          revealed: false,
          answers: [],
          status: 'active',
        });
      },
    };
  }),
);
