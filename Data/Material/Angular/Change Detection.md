# 1. Change Detection

## Table of Contents

- [1.1 How Change Detection Works](#11-how-change-detection-works)
- [1.2 Default vs OnPush](#12-default-vs-onpush)
- [1.3 Zone.js and NgZone](#13-zonejs-and-ngzone)
- [1.4 Zoneless Angular (Experimental v18+)](#14-zoneless-angular-experimental-v18)

---


## 1.1 How Change Detection Works

```mermaid
graph TB
    subgraph "Change Detection Flow"
        E["Browser Event<br/>(click, HTTP response, timer)"]
        Z["Zone.js intercepts<br/>async operation"]
        A["Angular notified:<br/>ApplicationRef.tick()"]
        CD["Top-down check<br/>from root component"]
        U["Update DOM bindings<br/>where values changed"]
    end

    E --> Z --> A --> CD --> U

    style Z fill:#fff3e0
    style A fill:#e1f5fe
    style CD fill:#e8f5e9
```

## 1.2 Default vs OnPush

```mermaid
graph TB
    subgraph "Default Strategy"
        D1["Root"]
        D2["Child A"]
        D3["Child B"]
        D4["Grandchild A1"]
        D5["Grandchild A2"]
        D6["Grandchild B1"]
    end

    D1 -->|"✅ check"| D2
    D1 -->|"✅ check"| D3
    D2 -->|"✅ check"| D4
    D2 -->|"✅ check"| D5
    D3 -->|"✅ check"| D6

    subgraph "OnPush Strategy"
        O1["Root"]
        O2["Child A ★OnPush"]
        O3["Child B"]
        O4["Grandchild A1"]
        O5["Grandchild A2"]
        O6["Grandchild B1"]
    end

    O1 -->|"⏭ skip"| O2
    O1 -->|"✅ check"| O3
    O2 -.->|"⏭ skip"| O4
    O2 -.->|"⏭ skip"| O5
    O3 -->|"✅ check"| O6

    style D1 fill:#c8e6c9
    style D2 fill:#c8e6c9
    style D3 fill:#c8e6c9
    style D4 fill:#c8e6c9
    style D5 fill:#c8e6c9
    style D6 fill:#c8e6c9

    style O1 fill:#c8e6c9
    style O2 fill:#fff9c4
    style O3 fill:#c8e6c9
    style O4 fill:#fff9c4
    style O5 fill:#fff9c4
    style O6 fill:#c8e6c9
```

**OnPush components are checked ONLY when:**
1. An `@Input()` reference changes (identity, not deep equality)
2. An event handler in the component (or child) fires
3. An Observable bound via `| async` emits
4. `ChangeDetectorRef.markForCheck()` is called
5. A signal read in the template updates (v17+)

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,   // ALWAYS prefer this
  template: `
    <div>{{ user.name }}</div>
    <div>{{ data$ | async }}</div>
  `
})
export class UserCardComponent {
  @Input() user!: User;                // Must pass new object reference to trigger
  data$ = this.dataService.getData();  // async pipe triggers markForCheck internally

  constructor(private cdr: ChangeDetectorRef) {}

  // Manual trigger if needed
  forceUpdate() {
    this.cdr.markForCheck();  // Mark component and ancestors as dirty
    // this.cdr.detectChanges();  // Immediately run CD for this component subtree
  }
}
```

## 1.3 Zone.js and NgZone

```typescript
@Injectable()
export class PerformanceService {
  constructor(private ngZone: NgZone) {}

  // Run OUTSIDE Angular's zone — prevents change detection triggers
  startPolling() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        // This won't trigger change detection
        this.collectMetrics();

        // When you DO need to update the UI:
        if (this.hasImportantUpdate) {
          this.ngZone.run(() => {
            this.updateUI();   // This WILL trigger change detection
          });
        }
      }, 1000);
    });
  }
}
```

## 1.4 Zoneless Angular (Experimental v18+)

```typescript
// main.ts — Zoneless bootstrap
bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // Zone.js is no longer needed in polyfills
  ]
});

// Components must use Signals or manually notify Angular
@Component({
  template: `<div>{{ count() }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  count = signal(0);    // Signal updates automatically schedule change detection

  increment() {
    this.count.update(c => c + 1);  // Angular knows to re-render
  }
}
```
