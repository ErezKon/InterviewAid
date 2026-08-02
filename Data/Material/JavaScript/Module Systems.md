# 1. Module Systems

```mermaid
flowchart TD
    subgraph CJS["CommonJS (Node.js Legacy)"]
        C1["const x = require('./mod')"]
        C2["module.exports = { x }"]
        C3["Synchronous loading\nRuntime resolution\nValue copy (mostly)"]
    end

    subgraph ESM["ES Modules (Modern Standard)"]
        E1["import { x } from './mod.js'"]
        E2["export const x = 1"]
        E3["Async loading\nStatic analysis (tree-shakeable)\nLive bindings"]
    end

    subgraph AMD["AMD (Legacy Browser)"]
        A1["define(['dep'], function(dep) { })"]
        A2["Async browser loading\nRequireJS"]
    end

    ESM -->|"Recommended\nfor all new code"| FUTURE["✅ Future Standard"]
    CJS -->|"Still prevalent\nin Node ecosystem"| LEGACY["⚠️ Legacy but common"]
    AMD -->|"Obsolete"| DEAD["❌ Deprecated"]

    style ESM fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
    style CJS fill:#2d333b,stroke:#f0883e,color:#c9d1d9
    style AMD fill:#3d1a1a,stroke:#f85149,color:#c9d1d9
```

```javascript
// === ESM KEY FEATURES ===

// Named exports (can have many)
export const API_URL = "https://api.example.com";
export function fetchData() { /* ... */ }
export class ApiClient { /* ... */ }

// Default export (one per module)
export default class App { /* ... */ }

// Re-exporting (barrel files)
export { fetchData, ApiClient } from "./api.js";
export * from "./utils.js";
export { default as App } from "./App.js";

// Dynamic import (code splitting)
async function loadChart() {
  const { Chart } = await import("./chart.js");
  return new Chart();
}

// Import assertions (newer)
import data from "./config.json" with { type: "json" };

// === LIVE BINDINGS DEMONSTRATION ===
// counter.js
export let count = 0;
export function increment() { count++; }

// main.js
import { count, increment } from "./counter.js";
console.log(count);  // 0
increment();
console.log(count);  // 1 ← LIVE binding! CJS would still show 0

// === CIRCULAR DEPENDENCY HANDLING ===
// ESM handles circular deps with live bindings (partially evaluated)
// CJS gives you whatever was exported at the time of the cycle
```
