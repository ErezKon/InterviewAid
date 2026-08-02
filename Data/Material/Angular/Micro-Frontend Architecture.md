# 1. Micro-Frontend Architecture

## Table of Contents

- [1.1 Architecture Overview](#11-architecture-overview)
- [1.2 Module Federation Setup](#12-module-federation-setup)

---


## 1.1 Architecture Overview

```mermaid
graph TB
    subgraph "Micro-Frontend Architecture"
        Shell["Shell Application<br/>(App Shell / Host)"]

        Shell --> MF1["MFE: Dashboard<br/>(Angular)"]
        Shell --> MF2["MFE: Orders<br/>(Angular)"]
        Shell --> MF3["MFE: Reports<br/>(React or any framework)"]

        Shell --> SS["Shared Services<br/>(Auth, Config, Events)"]
    end

    subgraph "Module Federation"
        WP["Webpack Module Federation<br/>or Native Federation"]
        WP --> R1["Remote: Dashboard"]
        WP --> R2["Remote: Orders"]
        WP --> R3["Remote: Reports"]
    end

    Shell --- WP

    style Shell fill:#e1f5fe,color:#000000
    style MF1 fill:#c8e6c9,color:#000000
    style MF2 fill:#c8e6c9,color:#000000
    style MF3 fill:#fff9c4,color:#000000
    style SS fill:#ffccbc,color:#000000
```

## 1.2 Module Federation Setup

```typescript
// Shell (Host) — webpack.config.js
module.exports = withModuleFederationPlugin({
  remotes: {
    dashboard: 'dashboard@http://localhost:4201/remoteEntry.js',
    orders: 'orders@http://localhost:4202/remoteEntry.js',
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
    rxjs: { singleton: true, strictVersion: true },
  },
});

// Shell routing
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('dashboard/Module').then(m => m.DashboardModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('orders/Routes').then(m => m.routes),
  },
];
```
