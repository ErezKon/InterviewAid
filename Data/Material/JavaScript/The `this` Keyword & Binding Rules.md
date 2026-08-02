# 1. The `this` Keyword & Binding Rules

## Table of Contents

- [1.1 The Four Binding Rules (in order of precedence)](#11-the-four-binding-rules-in-order-of-precedence)
- [1.2 Implementing `bind` — Interview Classic](#12-implementing-bind-interview-classic)

---


## 1.1 The Four Binding Rules (in order of precedence)

```mermaid
flowchart TD
    Q1{"Was `new` used?\n(new binding)"}
    Q1 -- Yes --> R1["'this' = newly\ncreated object"]
    Q1 -- No --> Q2{"Was call/apply/bind\nused? (explicit binding)"}
    Q2 -- Yes --> R2["'this' = specified\nobject"]
    Q2 -- No --> Q3{"Called as method?\nobj.fn() (implicit binding)"}
    Q3 -- Yes --> R3["'this' = owning\nobject"]
    Q3 -- No --> Q4{"Is it an arrow\nfunction?"}
    Q4 -- Yes --> R4["'this' = lexical\n(inherited from enclosing scope)"]
    Q4 -- No --> R5["Default binding\nstrict → undefined\nsloppy → globalThis"]

    style Q1 fill:#2d333b,stroke:#f0883e,color:#c9d1d9
    style Q2 fill:#2d333b,stroke:#f0883e,color:#c9d1d9
    style Q3 fill:#2d333b,stroke:#f0883e,color:#c9d1d9
    style Q4 fill:#2d333b,stroke:#f0883e,color:#c9d1d9
    style R1 fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
    style R2 fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
    style R3 fill:#1a3a1a,stroke:#3fb950,color:#c9d1d9
    style R4 fill:#1a2a3a,stroke:#58a6ff,color:#c9d1d9
    style R5 fill:#3d1a1a,stroke:#f85149,color:#c9d1d9
```

```javascript
// 1. NEW BINDING (highest precedence)
function Person(name) {
  this.name = name;
}
const p = new Person("Alice"); // this = new object → { name: "Alice" }

// 2. EXPLICIT BINDING
function greet() { return `Hello, ${this.name}`; }
const obj = { name: "Bob" };

greet.call(obj);            // "Hello, Bob"
greet.apply(obj);           // "Hello, Bob"
const bound = greet.bind(obj);
bound();                    // "Hello, Bob"

// 3. IMPLICIT BINDING
const user = {
  name: "Charlie",
  greet() { return `Hello, ${this.name}`; }
};
user.greet();               // "Hello, Charlie"

// ❌ IMPLICIT BINDING LOSS
const fn = user.greet;     // Extracted from context!
fn();                       // "Hello, undefined" (default binding)

// 4. ARROW FUNCTIONS — lexical `this`
const team = {
  name: "Engineering",
  members: ["A", "B", "C"],
  
  // ✅ Arrow function inherits `this` from `list()` method context
  list() {
    return this.members.map(m => `${m} from ${this.name}`);
  },
  
  // ❌ Arrow function as method — `this` is outer/global scope!
  broken: () => {
    return this.name; // `this` is NOT `team`!
  }
};
```

## 1.2 Implementing `bind` — Interview Classic

```javascript
Function.prototype.myBind = function(context, ...preArgs) {
  if (typeof this !== "function") {
    throw new TypeError("Bind must be called on a function");
  }
  
  const originalFn = this;
  
  const bound = function(...callArgs) {
    // If called with `new`, `this` should be the new instance
    const isNewCall = this instanceof bound;
    return originalFn.apply(
      isNewCall ? this : context,
      [...preArgs, ...callArgs]
    );
  };
  
  // Maintain prototype chain for `new` usage
  bound.prototype = Object.create(originalFn.prototype);
  return bound;
};
```
