# 1. Project Structure & Tooling

## Table of Contents

- [1.1 Recommended Enterprise Project Layout](#11-recommended-enterprise-project-layout)
- [1.2 Angular CLI Essentials](#12-angular-cli-essentials)
- [1.3 Angular Configuration Files](#13-angular-configuration-files)

---


## 1.1 Recommended Enterprise Project Layout

```
src/
├── app/
│   ├── core/                    # Singleton services, guards, interceptors
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── auth.interceptor.ts
│   │   ├── http/
│   │   │   └── error.interceptor.ts
│   │   └── core.module.ts
│   │
│   ├── shared/                  # Reusable components, directives, pipes
│   │   ├── components/
│   │   │   ├── button/
│   │   │   └── modal/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── models/              # Interfaces / types
│   │   └── shared.module.ts
│   │
│   ├── features/                # Lazy-loaded feature modules
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── state/           # Feature-level state (NgRx / signals)
│   │   │   ├── dashboard-routing.module.ts
│   │   │   └── dashboard.module.ts
│   │   ├── users/
│   │   └── orders/
│   │
│   ├── layout/                  # Shell components
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── footer/
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── styles/
│   ├── _variables.scss
│   └── global.scss
├── index.html
└── main.ts
```

## 1.2 Angular CLI Essentials

```bash
# Create new project
ng new my-app --routing --style=scss --strict

# Generate artifacts
ng generate module features/orders --route orders --module app
ng generate component features/orders/components/order-list --change-detection OnPush
ng generate service core/auth/auth
ng generate guard core/auth/auth --implements CanActivate
ng generate pipe shared/pipes/currency-format
ng generate directive shared/directives/autofocus
ng generate interceptor core/http/error
ng generate library my-shared-lib       # For publishable libraries

# Build & Serve
ng serve --configuration=production
ng build --configuration=production --source-map=false
ng build --stats-json              # For bundle analysis

# Testing
ng test --code-coverage
ng e2e
```

## 1.3 Angular Configuration Files

```
angular.json       →  Workspace & project config (build targets, assets, styles)
tsconfig.json      →  TypeScript compiler options (path aliases, strict flags)
tsconfig.app.json  →  App-specific TS config
tsconfig.spec.json →  Test-specific TS config
.browserslistrc    →  Target browsers for CSS/JS transpilation
```

**Key `angular.json` interview points:**
- `budgets` — enforce bundle size limits
- `fileReplacements` — swap environment files
- `optimization`, `aot`, `buildOptimizer` — production flags
- `assets` and `styles` arrays — global resources
