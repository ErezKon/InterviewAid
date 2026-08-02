# 1. Modules & the Injection System

## Table of Contents

- [1.1 NgModule Architecture](#11-ngmodule-architecture)
- [1.2 NgModule Anatomy](#12-ngmodule-anatomy)
- [1.3 Dependency Injection — Hierarchical Injector Tree](#13-dependency-injection-hierarchical-injector-tree)
- [1.4 Provider Strategies](#14-provider-strategies)
- [1.5 Injection Tokens](#15-injection-tokens)
- [1.6 Resolution Modifiers](#16-resolution-modifiers)

---


## 1.1 NgModule Architecture

```mermaid
graph TB
    subgraph "Module Hierarchy"
        AppModule["AppModule<br/>(Root)"]
        CoreModule["CoreModule<br/>(forRoot, singleton services)"]
        SharedModule["SharedModule<br/>(reusable declarations)"]
        FeatureA["FeatureAModule<br/>(lazy loaded)"]
        FeatureB["FeatureBModule<br/>(lazy loaded)"]
    end

    AppModule -->|imports once| CoreModule
    AppModule -->|imports| SharedModule
    AppModule -.->|lazy route| FeatureA
    AppModule -.->|lazy route| FeatureB
    FeatureA -->|imports| SharedModule
    FeatureB -->|imports| SharedModule

    style AppModule fill:#c8e6c9,color:#000000
    style CoreModule fill:#ffccbc,color:#000000
    style SharedModule fill:#bbdefb,color:#000000
    style FeatureA fill:#fff9c4,color:#000000
    style FeatureB fill:#fff9c4,color:#000000
```

## 1.2 NgModule Anatomy

```typescript
@NgModule({
  declarations: [         // Components, Directives, Pipes that BELONG to this module
    OrderListComponent,
    OrderDetailComponent,
    OrderStatusPipe,
  ],
  imports: [              // Other modules whose EXPORTS this module needs
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [            // Services scoped to this module's injector
    OrderService,         // (if lazy loaded → gets its own injector)
  ],
  exports: [              // Declarations available to importing modules
    OrderListComponent,
  ],
})
export class OrdersModule {}
```

## 1.3 Dependency Injection — Hierarchical Injector Tree

```mermaid
graph TB
    subgraph "Injector Hierarchy"
        PI["Platform Injector<br/>(Angular internals)"]
        RI["Root Injector<br/>(providedIn: 'root')"]
        MI["Module Injector<br/>(lazy module providers)"]
        CI1["Component Injector<br/>(providers: [...])"]
        CI2["Component Injector<br/>(viewProviders: [...])"]
        CI3["Child Component<br/>Injector"]
    end

    PI --> RI
    RI --> MI
    MI --> CI1
    CI1 --> CI3
    MI --> CI2

    style PI fill:#e0e0e0,color:#000000
    style RI fill:#c8e6c9,color:#000000
    style MI fill:#fff9c4,color:#000000
    style CI1 fill:#bbdefb,color:#000000
    style CI2 fill:#bbdefb,color:#000000
    style CI3 fill:#bbdefb,color:#000000
```

## 1.4 Provider Strategies

```typescript
// 1. Tree-shakable (PREFERRED) — providedIn
@Injectable({
  providedIn: 'root'       // Singleton at root injector, tree-shakable
})
export class AuthService {}

@Injectable({
  providedIn: 'any'        // Each lazy module gets its own instance
})
export class AnalyticsService {}

@Injectable({
  providedIn: 'platform'   // Shared across Angular apps on same page
})
export class SharedService {}

// 2. Module-level providers
@NgModule({
  providers: [OrderService]  // Scoped if lazy-loaded, else root
})

// 3. Component-level providers
@Component({
  providers: [FormStateService]     // New instance per component
})

// 4. viewProviders — not available to content-projected children
@Component({
  viewProviders: [InternalService]
})

// 5. useFactory, useValue, useExisting, useClass
providers: [
  { provide: API_URL, useValue: 'https://api.example.com' },
  { provide: LoggerService, useClass: environment.production ? ProdLogger : DevLogger },
  { provide: AbstractDataService, useExisting: ConcreteDataService },
  {
    provide: APP_INITIALIZER,
    useFactory: (config: ConfigService) => () => config.load(),
    deps: [ConfigService],
    multi: true
  },
]
```

## 1.5 Injection Tokens

```typescript
// Avoid string tokens — use InjectionToken for type safety
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'https://api.default.com',
});

export const FEATURE_FLAGS = new InjectionToken<FeatureFlags>('FEATURE_FLAGS');

// Usage
constructor(@Inject(API_BASE_URL) private apiUrl: string) {}
```

## 1.6 Resolution Modifiers

```typescript
constructor(
  private required: UserService,                  // Throws if not found

  @Optional() private optional: LogService,       // null if not found

  @Self() private self: FormService,              // Only THIS injector

  @SkipSelf() private parent: TreeService,        // Skip this, look parent+

  @Host() private host: TabGroupService,          // Up to host component only
) {}
```
