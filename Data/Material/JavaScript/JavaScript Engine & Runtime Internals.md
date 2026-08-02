# 1. JavaScript Engine & Runtime Internals

## 1.1 How a JS Engine Works

```mermaid
flowchart TD
    A["📄 Source Code"] --> B["Lexical Analysis\n(Tokenizer)"]
    B --> C["Syntax Analysis\n(Parser → AST)"]
    C --> D["Interpreter\n(Ignition in V8)"]
    D --> E["Bytecode"]
    E --> F{"Hot Code\nDetected?"}
    F -- Yes --> G["Optimizing Compiler\n(TurboFan in V8)"]
    G --> H["Optimized\nMachine Code"]
    H --> I{"Deoptimization\nNeeded?"}
    I -- Yes --> E
    I -- No --> J["⚡ Execute Fast"]
    F -- No --> K["🐢 Execute Bytecode"]

    style A fill:#2d333b,stroke:#58a6ff,color:#c9d1d9
    style G fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
    style H fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
    style J fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
```

### Key Engines
| Engine | Browser/Runtime | Compiler |
|--------|----------------|----------|
| **V8** | Chrome, Node.js, Deno, Bun | TurboFan |
| **SpiderMonkey** | Firefox | WarpMonkey |
| **JavaScriptCore** | Safari, Bun | FTL JIT |
| **Chakra** | Legacy Edge | SimpleJIT |

### 1.2 JIT Compilation: Why It Matters at Principal Level

```javascript
// V8 optimizes monomorphic call sites (same shape)
// ✅ MONOMORPHIC — fast, single hidden class
function getX(obj) {
  return obj.x;
}

const a = { x: 1, y: 2 };
const b = { x: 3, y: 4 };
getX(a); // V8 creates an inline cache for shape {x, y}
getX(b); // Same shape — cache hit, optimized

// ❌ MEGAMORPHIC — slow, multiple hidden classes
const c = { x: 5, z: 6 };       // Different shape!
const d = { x: 7, w: 8, v: 9 }; // Yet another shape!
getX(c); // Cache miss — deoptimize
getX(d); // Megamorphic state — V8 gives up optimizing
```

**Principal-Level Insight:** Understanding hidden classes and inline caches is critical when designing high-performance libraries or frameworks. Object shape consistency directly impacts JIT optimization.

### 1.3 Hidden Classes (Maps in V8)

```mermaid
flowchart LR
    subgraph "Object Creation"
        A["const obj = {}"] --> B["Hidden Class C0\n(empty)"]
        B --> C["obj.x = 1"]
        C --> D["Hidden Class C1\n{x: offset 0}"]
        D --> E["obj.y = 2"]
        E --> F["Hidden Class C2\n{x: offset 0, y: offset 1}"]
    end

    subgraph "Transition Chain"
        B -.->|"add x"| D
        D -.->|"add y"| F
    end

    style B fill:#2d333b,stroke:#f0883e,color:#c9d1d9
    style D fill:#2d333b,stroke:#f0883e,color:#c9d1d9
    style F fill:#2d333b,stroke:#f0883e,color:#c9d1d9
```

```javascript
// ✅ Always initialize properties in the same order
class Point {
  constructor(x, y) {
    this.x = x; // Always x first
    this.y = y; // Always y second
  }
}

// ❌ Don't add properties conditionally
class BadPoint {
  constructor(x, y, hasZ) {
    this.x = x;
    if (hasZ) this.z = 0; // Creates different hidden class!
    this.y = y;
  }
}
```
