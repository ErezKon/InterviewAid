# 1. Architecture & System Design

## 1.1 Project Structure (Feature-based)

```
src/
├── app/                     # App-level setup
│   ├── App.tsx
│   ├── providers.tsx        # All context providers composed
│   ├── routes.tsx            # Route configuration
│   └── global.css
├── features/                # Feature modules (domain-driven)
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginForm.test.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts         # Public API (barrel export)
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── index.ts
│   └── settings/
├── shared/                  # Shared across features
│   ├── components/          # Button, Modal, Table, etc.
│   ├── hooks/               # useDebounce, useMediaQuery, etc.
│   ├── utils/               # formatDate, classNames, etc.
│   ├── types/               # Global types
│   └── constants/
├── infrastructure/          # Technical concerns
│   ├── api/                 # API client setup
│   ├── monitoring/          # Error tracking, analytics
│   └── storage/             # localStorage helpers
└── test/                    # Test utilities
    ├── setup.ts
    ├── mocks/
    └── helpers/
```

## 1.2 Module Boundaries

```mermaid
flowchart TD
    subgraph "Feature: Auth"
        A1["components/"] 
        A2["hooks/"]
        A3["api/"]
        A4["index.ts\n(Public API)"]
    end

    subgraph "Feature: Dashboard"
        B1["components/"]
        B2["hooks/"]
        B3["api/"]
        B4["index.ts"]
    end

    subgraph "Shared"
        S1["components/"]
        S2["hooks/"]
        S3["utils/"]
    end

    A1 --> S1
    A2 --> S2
    B1 --> S1
    B2 --> S2

    B1 -.->|"Import via index.ts only"| A4
    A1 -.->|"Import via index.ts only"| B4

    A1 ~~~ A2 ~~~ A3

    style A4 fill:#e67e22,color:#fff
    style B4 fill:#e67e22,color:#fff
    style S1 fill:#27ae60,color:#fff
```

> **Principal-level rule:** Features import from other features ONLY through their `index.ts` barrel exports. This creates clear module boundaries and makes refactoring safe.

## 1.3 Data Flow Architecture

```mermaid
flowchart TD
    subgraph "Data Layer"
        API["API Client\n(Axios/fetch wrapper)"]
        TQ["TanStack Query\n(Server state cache)"]
        Store["Zustand/Redux\n(Client state)"]
    end

    subgraph "Feature Layer"
        Hooks["Custom Hooks\n(useUsers, useAuth)"]
        Logic["Business Logic\n(Pure functions)"]
    end

    subgraph "UI Layer"
        Pages["Pages/Routes"]
        Containers["Smart Components"]
        Presentational["Dumb Components"]
    end

    API --> TQ
    TQ --> Hooks
    Store --> Hooks
    Logic --> Hooks
    Hooks --> Containers
    Containers --> Presentational
    Pages --> Containers

    style API fill:#e74c3c,color:#fff
    style TQ fill:#e67e22,color:#fff
    style Store fill:#9b59b6,color:#fff
    style Hooks fill:#3498db,color:#fff
    style Pages fill:#27ae60,color:#fff
```

## 1.4 Design System Architecture

```mermaid
flowchart TD
    subgraph "Design Tokens"
        DT["Colors, Spacing, Typography\nShadows, Breakpoints"]
    end

    subgraph "Primitives"
        P1["Box"]
        P2["Text"]
        P3["Stack"]
        P4["Flex / Grid"]
    end

    subgraph "Components"
        C1["Button"]
        C2["Input"]
        C3["Select"]
        C4["Modal"]
        C5["Table"]
    end

    subgraph "Patterns"
        PA1["Form (validation, submission)"]
        PA2["DataTable (sort, filter, paginate)"]
        PA3["CommandPalette"]
    end

    subgraph "Templates"
        T1["AuthLayout"]
        T2["DashboardLayout"]
        T3["SettingsPage"]
    end

    DT --> P1 & P2 & P3 & P4
    P1 & P2 & P3 & P4 --> C1 & C2 & C3 & C4 & C5
    C1 & C2 & C3 & C4 & C5 --> PA1 & PA2 & PA3
    PA1 & PA2 & PA3 --> T1 & T2 & T3

    style DT fill:#f1c40f,color:#333
    style P1 fill:#3498db,color:#fff
    style C1 fill:#e67e22,color:#fff
    style PA1 fill:#9b59b6,color:#fff
    style T1 fill:#27ae60,color:#fff
```

---
