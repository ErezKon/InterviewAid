# 1. Signals & Modern Angular (v16–v18+)

## Table of Contents

- [1.1 Signals Core API](#11-signals-core-api)
- [1.2 Signals with Components](#12-signals-with-components)
- [1.3 Signal Inputs, Outputs & Model (Angular 17.1+)](#13-signal-inputs-outputs-model-angular-171)
- [1.4 RxJS ↔ Signal Interop](#14-rxjs-signal-interop)
- [1.5 Signal vs Observable: When to Use What](#15-signal-vs-observable-when-to-use-what)

---


## 1.1 Signals Core API

```typescript
import { signal, computed, effect, untracked } from '@angular/core';

// Writable signal
const count = signal(0);
count();              // Read: 0
count.set(5);         // Set absolute value
count.update(c => c + 1); // Update based on current value

// Computed signal (derived, read-only, memoized)
const doubleCount = computed(() => count() * 2);
doubleCount();        // 12

// Effect (side effect that runs when signals change)
effect(() => {
  console.log(`Count changed to: ${count()}`);
  // Automatically tracks which signals are read
  // Re-runs whenever those signals change
});

// Untracked — read a signal without creating a dependency
effect(() => {
  console.log(`Count: ${count()}`);
  const other = untracked(() => otherSignal()); // Won't re-run when otherSignal changes
});
```

## 1.2 Signals with Components

```typescript
@Component({
  selector: 'app-todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input #input (keyup.enter)="addTodo(input.value); input.value = ''" />

    @for (todo of filteredTodos(); track todo.id) {
      <div [class.completed]="todo.completed">
        <span>{{ todo.text }}</span>
        <button (click)="toggleTodo(todo.id)">Toggle</button>
        <button (click)="removeTodo(todo.id)">Remove</button>
      </div>
    }

    <div class="filters">
      <button (click)="filter.set('all')">All ({{ totalCount() }})</button>
      <button (click)="filter.set('active')">Active ({{ activeCount() }})</button>
      <button (click)="filter.set('completed')">Completed ({{ completedCount() }})</button>
    </div>
  `,
})
export class TodoListComponent {
  // State
  todos = signal<Todo[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');

  // Computed
  filteredTodos = computed(() => {
    const todos = this.todos();
    switch (this.filter()) {
      case 'active':    return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default:          return todos;
    }
  });

  totalCount = computed(() => this.todos().length);
  activeCount = computed(() => this.todos().filter(t => !t.completed).length);
  completedCount = computed(() => this.todos().filter(t => t.completed).length);

  // Persistence effect
  constructor() {
    // Load from localStorage
    const stored = localStorage.getItem('todos');
    if (stored) this.todos.set(JSON.parse(stored));

    // Auto-save
    effect(() => {
      const todos = this.todos();
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  }

  // Actions
  addTodo(text: string) {
    if (!text.trim()) return;
    this.todos.update(todos => [
      ...todos,
      { id: crypto.randomUUID(), text: text.trim(), completed: false },
    ]);
  }

  toggleTodo(id: string) {
    this.todos.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  removeTodo(id: string) {
    this.todos.update(todos => todos.filter(t => t.id !== id));
  }
}
```

## 1.3 Signal Inputs, Outputs & Model (Angular 17.1+)

```typescript
@Component({
  selector: 'app-user-card',
  template: `
    <div class="card" [class.selected]="selected()">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
      @if (showActions()) {
        <button (click)="selected.set(!selected())">
          {{ selected() ? 'Deselect' : 'Select' }}
        </button>
        <button (click)="delete.emit(user().id)">Delete</button>
      }
    </div>
  `,
})
export class UserCardComponent {
  // Signal inputs (replaces @Input())
  user = input.required<User>();                      // Required
  showActions = input(true);                          // With default
  highlightColor = input<string>('yellow', {          // With alias
    alias: 'highlight',
  });

  // Signal two-way binding (replaces @Input() + @Output() combo)
  selected = model(false);
  // Parent: <app-user-card [(selected)]="isSelected" />

  // Output (replaces @Output())
  delete = output<string>();
  // Or with OutputEmitterRef:
  // delete = output<string>({ alias: 'onDelete' });
}
```

## 1.4 RxJS ↔ Signal Interop

```typescript
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({})
export class InteropComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  // Observable → Signal
  userId = toSignal(
    this.route.paramMap.pipe(map(pm => pm.get('id'))),
    { initialValue: null }
  );

  // Signal → Observable
  searchTerm = signal('');
  searchTerm$ = toObservable(this.searchTerm);

  // Combining
  searchResults = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.http.get<Result[]>(`/api/search?q=${term}`)),
    ),
    { initialValue: [] }
  );
}
```

## 1.5 Signal vs Observable: When to Use What

| Use Case | Signal | Observable |
|---|---|---|
| Synchronous state | ✅ Perfect | Overkill |
| UI bindings | ✅ Direct, no `async` pipe | Works with `async` |
| Derived/computed values | ✅ `computed()` | `combineLatest` + `map` |
| Async streams (WebSocket, events) | ❌ Not designed for this | ✅ Perfect |
| Complex async flows (retry, debounce) | Use `toSignal()` bridge | ✅ RxJS operators |
| Time-based operations | ❌ | ✅ `timer`, `interval`, `debounceTime` |
| Cancellation | ❌ | ✅ Unsubscribe |
| Backpressure | ❌ | ✅ Buffer, throttle |
