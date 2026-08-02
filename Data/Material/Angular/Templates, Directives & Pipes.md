# 1. Templates, Directives & Pipes

## Table of Contents

- [1.1 Template Syntax Quick Reference](#11-template-syntax-quick-reference)
- [1.2 Structural Directives](#12-structural-directives)
- [1.3 New Control Flow Syntax (Angular 17+)](#13-new-control-flow-syntax-angular-17)
- [1.4 Custom Structural Directive](#14-custom-structural-directive)
- [1.5 Custom Attribute Directive](#15-custom-attribute-directive)
- [1.6 Pipes](#16-pipes)

---


## 1.1 Template Syntax Quick Reference

```typescript
// Interpolation
{{ expression }}

// Property binding
[property]="expression"
[attr.aria-label]="label"
[class.active]="isActive"
[style.width.px]="width"

// Event binding
(click)="onClick($event)"
(keyup.enter)="onSubmit()"

// Two-way binding
[(ngModel)]="name"

// Template reference variable
<input #nameInput />  →  nameInput.value

// Safe navigation operator
{{ user?.address?.city }}

// Non-null assertion (template)
{{ user!.name }}
```

## 1.2 Structural Directives

```html
<!-- *ngIf with else -->
<div *ngIf="items.length > 0; else emptyState">
  Content
</div>
<ng-template #emptyState>
  <p>No items found</p>
</ng-template>

<!-- *ngIf with as (unwrap observable) -->
<div *ngIf="user$ | async as user">
  {{ user.name }}
</div>

<!-- *ngFor with tracking and local variables -->
<div *ngFor="let item of items; trackBy: trackById;
             let i = index;
             let first = first;
             let last = last;
             let even = even;
             let odd = odd">
  {{ i }}: {{ item.name }}
</div>

<!-- *ngSwitch -->
<div [ngSwitch]="status">
  <span *ngSwitchCase="'active'">Active</span>
  <span *ngSwitchCase="'inactive'">Inactive</span>
  <span *ngSwitchDefault>Unknown</span>
</div>

<!-- ng-container (grouping without extra DOM) -->
<ng-container *ngIf="showHeader">
  <h1>Title</h1>
  <p>Subtitle</p>
</ng-container>

<!-- ng-template (lazy rendering) -->
<ng-template #loading>
  <app-spinner></app-spinner>
</ng-template>
```

## 1.3 New Control Flow Syntax (Angular 17+)

```html
<!-- @if / @else if / @else -->
@if (user) {
  <h1>Welcome, {{ user.name }}</h1>
} @else if (loading) {
  <app-spinner />
} @else {
  <p>Please log in</p>
}

<!-- @for with required track -->
@for (item of items; track item.id; let idx = $index, count = $count) {
  <div>{{ idx + 1 }} of {{ count }}: {{ item.name }}</div>
} @empty {
  <p>No items available</p>
}

<!-- @switch -->
@switch (status) {
  @case ('active') { <span class="badge-green">Active</span> }
  @case ('inactive') { <span class="badge-red">Inactive</span> }
  @default { <span>Unknown</span> }
}

<!-- @defer (lazy loading blocks) -->
@defer (on viewport) {
  <app-heavy-chart [data]="chartData" />
} @loading (minimum 300ms) {
  <app-skeleton />
} @placeholder (minimum 100ms) {
  <div class="chart-placeholder"></div>
} @error {
  <p>Failed to load chart</p>
}

<!-- @defer triggers: on idle, on viewport, on interaction, on hover, on timer(5s),
     when condition, on immediate -->
```

## 1.4 Custom Structural Directive

```typescript
@Directive({
  selector: '[appRepeat]',
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRepeat(count: number) {
    this.viewContainer.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,
        index: i,
        count,
      });
    }
  }
}

// Usage: <div *appRepeat="5; let i">Item {{ i }}</div>
```

## 1.5 Custom Attribute Directive

```typescript
@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hide();
  }

  private show() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.tooltipPosition}`);
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  private hide() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  ngOnDestroy() {
    this.hide();
  }
}
```

## 1.6 Pipes

### Built-in Pipes

```html
{{ birthday | date:'longDate' }}
{{ price | currency:'USD':'symbol':'1.2-2' }}
{{ value | number:'1.0-3' }}
{{ name | uppercase }}
{{ name | lowercase }}
{{ name | titlecase }}
{{ text | slice:0:100 }}
{{ obj | json }}
{{ percentage | percent:'1.0-2' }}
{{ observable$ | async }}
{{ value | i18nPlural:pluralMapping }}
```

### Custom Pure Pipe

```typescript
@Pipe({
  name: 'fileSize',
  pure: true,         // DEFAULT: recalculated only when input reference changes
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }
}

// Usage: {{ 1048576 | fileSize }}  →  "1 MB"
// Usage: {{ 1048576 | fileSize:0 }}  →  "1 MB"
```

### Impure Pipe (Use Sparingly)

```typescript
@Pipe({
  name: 'filterBy',
  pure: false,        // Runs on EVERY change detection cycle
})
export class FilterByPipe implements PipeTransform {
  transform<T>(items: T[], field: keyof T, value: any): T[] {
    return items?.filter(item => item[field] === value) ?? [];
  }
}
// WARNING: impure pipes can severely hurt performance
// Better approach: compute filtered list in the component
```
