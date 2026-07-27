# 2623. Memoize

**Difficulty:** 🟡 Medium
**Companies:** Bloomberg, Hubspot, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Write a `memoize` function that accepts a function `fn` (which accepts `sum`, `fib`, or `factorial` style calls with **primitive** arguments) and returns a memoized version. The memoized function should cache results and return the cached value on subsequent calls with the same inputs.

**Constraints:**
- `fn` is one of: `sum(a, b)`, `fib(n)`, or `factorial(n)`
- All arguments are primitive (numbers)
- `0 ≤ args ≤ 10⁵`

---

## Examples

**Example 1:**
```
const memoizedSum = memoize((a, b) => a + b);
memoizedSum(2, 3); // 5 (computed, callCount = 1)
memoizedSum(2, 3); // 5 (cached, callCount = 1)
```

---

## Key Insight

> Since all arguments are primitives, `JSON.stringify(args)` produces a unique string key for each unique argument combination. Use a `Map` keyed by this string to cache results.

---

## Approach

```javascript
FUNCTION memoize(fn):
    cache ← new Map()
    RETURN FUNCTION(...args):
        key ← JSON.stringify(args)
        IF cache.has(key) THEN
            RETURN cache.get(key)
        result ← fn(...args)
        cache.set(key, result)
        RETURN result
```

---

## Walkthrough

```
fn = (a, b) => a + b
memoized = memoize(fn)

Call memoized(2, 3):
  key = "[2,3]", not in cache → compute fn(2,3) = 5
  cache = {"[2,3]": 5}
  return 5

Call memoized(2, 3):
  key = "[2,3]", found in cache → return 5 (no fn call)

Call memoized(3, 2):
  key = "[3,2]", not in cache → compute fn(3,2) = 5
  cache = {"[2,3]": 5, "[3,2]": 5}
  return 5
```

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Lookup / Insert | **O(k)** per call (stringify) | **O(n)** for cache |

Where `k` = number of arguments, `n` = unique call count.

---

## Follow-Up Questions

1. **Why JSON.stringify?** It creates a deterministic string from primitive args. Simple but only works for primitives.
2. **What about object arguments?** JSON.stringify won't distinguish objects by reference — use Memoize II's trie approach instead.
3. **What about single-argument functions?** Can use the argument directly as the Map key, avoiding stringify overhead.
4. **What about cache eviction?** Add an LRU cache (doubly-linked list + Map) if memory is a concern.

---

## Key Takeaway

> **JSON.stringify as cache key** is the simplest memoization pattern for functions with primitive arguments. For arbitrary types, upgrade to a nested Map trie (see Memoize II).

---
