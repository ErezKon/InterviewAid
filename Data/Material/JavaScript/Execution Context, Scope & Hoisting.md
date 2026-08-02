# 1. Execution Context, Scope & Hoisting

## Table of Contents

- [1.1 Execution Context Lifecycle](#11-execution-context-lifecycle)
- [1.2 The Call Stack](#12-the-call-stack)
- [1.3 Hoisting Deep Dive](#13-hoisting-deep-dive)
- [1.4 Scope Types](#14-scope-types)

---


## 1.1 Execution Context Lifecycle

```mermaid
flowchart TD
    subgraph GEC["Global Execution Context"]
        direction TB
        G1["Creation Phase"] --> G2["Execution Phase"]
        
        subgraph G1Detail["Creation Phase"]
            G1A["1. Create Global Object\n(window / globalThis)"]
            G1B["2. Create 'this' binding"]
            G1C["3. Setup Memory Heap\n(Variable Environment)"]
            G1D["4. Hoist declarations"]
            G1A --> G1B --> G1C --> G1D
        end
    end

    subgraph FEC["Function Execution Context"]
        direction TB
        F1["Creation Phase"] --> F2["Execution Phase"]
        
        subgraph F1Detail["Creation Phase"]
            F1A["1. Create Arguments Object"]
            F1B["2. Create 'this' binding\n(depends on call-site)"]
            F1C["3. Setup Scope Chain\n(Outer Environment Reference)"]
            F1D["4. Hoist declarations"]
            F1A --> F1B --> F1C --> F1D
        end
    end

    GEC --> FEC

    style GEC fill:#1c2333,stroke:#58a6ff,color:#c9d1d9
    style FEC fill:#1c2333,stroke:#f0883e,color:#c9d1d9
```

## 1.2 The Call Stack

```javascript
function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second start");
  third();
  console.log("second end");
}

function third() {
  console.log("third");
}

first();
```

```mermaid
flowchart LR
    subgraph Step1["Step 1"]
        S1["Global\nContext"]
    end
    subgraph Step2["Step 2"]
        S2A["first()"]
        S2B["Global\nContext"]
        S2A --- S2B
    end
    subgraph Step3["Step 3"]
        S3A["second()"]
        S3B["first()"]
        S3C["Global\nContext"]
        S3A --- S3B --- S3C
    end
    subgraph Step4["Step 4"]
        S4A["third()"]
        S4B["second()"]
        S4C["first()"]
        S4D["Global\nContext"]
        S4A --- S4B --- S4C --- S4D
    end
    subgraph Step5["Step 5 (unwind)"]
        S5A["second()"]
        S5B["first()"]
        S5C["Global\nContext"]
        S5A --- S5B --- S5C
    end

    Step1 --> Step2 --> Step3 --> Step4 --> Step5

    style Step4 fill:#2a1a1a,stroke:#f85149,color:#c9d1d9
```

## 1.3 Hoisting Deep Dive

```javascript
// What the developer writes:
console.log(a);     // undefined (not ReferenceError!)
console.log(b);     // ReferenceError: Cannot access 'b' before initialization
console.log(c);     // ReferenceError: Cannot access 'c' before initialization
console.log(fn);    // [Function: fn]
console.log(expr);  // undefined

var a = 1;
let b = 2;
const c = 3;
function fn() {}
var expr = function() {};

// How the engine sees it (conceptually):
// CREATION PHASE:
// var a        → allocated, initialized to undefined
// let b        → allocated, NOT initialized (TDZ)
// const c      → allocated, NOT initialized (TDZ)
// function fn  → allocated, initialized with function body
// var expr     → allocated, initialized to undefined
```

### Temporal Dead Zone (TDZ)

```mermaid
flowchart LR
    A["Block Start\n{"] --> B["TDZ for 'x'\n❌ Cannot Access"]
    B --> C["let x = 10;\n✅ Initialized"]
    C --> D["x is accessible\n✅ Use freely"]
    D --> E["Block End\n}"]

    style B fill:#3d1a1a,stroke:#f85149,color:#c9d1d9
    style C fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
    style D fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
```

## 1.4 Scope Types

```javascript
// 1. GLOBAL SCOPE
var globalVar = "I'm global";

// 2. FUNCTION SCOPE
function outer() {
  var functionScoped = "I'm function-scoped";
  
  // 3. BLOCK SCOPE (let, const only)
  if (true) {
    let blockScoped = "I'm block-scoped";
    const alsoBlock = "Me too";
    var notBlockScoped = "I escape to function scope!";
  }
  
  console.log(notBlockScoped); // ✅ "I escape to function scope!"
  // console.log(blockScoped); // ❌ ReferenceError
  
  // 4. LEXICAL (STATIC) SCOPE — determined at write-time, not call-time
  function inner() {
    console.log(functionScoped); // ✅ Accesses parent scope
  }
}

// 5. MODULE SCOPE
// Each module has its own top-level scope
// export/import determines what crosses boundaries
```
