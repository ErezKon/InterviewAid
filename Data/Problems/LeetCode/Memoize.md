# 2623. Memoize

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/memoize](https://leetcode.com/problems/memoize)
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

Given a function `fn`, return a **memoized** version of that function.

A **memoized** function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

You can assume there are **3** possible input functions: `sum`, `fib`, and `factorial`.

- `sum` accepts two integers `a` and `b` and returns `a + b`. Assume that if a value has already been cached for the arguments `(b, a)` where `a != b`, it cannot be used for the arguments `(a, b)`. For example, if the arguments are `(3, 2)` and `(2, 3)`, two separate calls should be made.
- `fib` accepts a single integer `n` and returns `1` if `n <= 1` or `fib(n - 1) + fib(n - 2)` otherwise.
- `factorial` accepts a single integer `n` and returns `1` if `n <= 1` or `factorial(n - 1) * n` otherwise.

**Constraints:**
- `0 ≤ a, b ≤ 10⁵`
- `1 ≤ n ≤ 10`
- `1 ≤ actions.length ≤ 10⁵`
- `actions.length === values.length`
- `actions[i]` is one of `"call"` and `"getCallCount"`
- `fnName` is one of `"sum"`, `"factorial"` and `"fib"`

---

## Examples

```
Example 1:
  Input:
  fnName = "sum"
  actions = ["call","call","getCallCount","call","getCallCount"]
  values = [[2,2],[2,2],[],[1,2],[]]
  Output: [4,4,1,3,2]
  Explanation:
  const sum = (a, b) => a + b;
  const memoizedSum = memoize(sum);
  memoizedSum(2, 2); // "call" - returns 4. sum() was called as (2, 2) was not seen before.
  memoizedSum(2, 2); // "call" - returns 4. However sum() was not called because the same inputs were seen before.
  // "getCallCount" - total call count: 1
  memoizedSum(1, 2); // "call" - returns 3. sum() was called as (1, 2) was not seen before.
  // "getCallCount" - total call count: 2
```

```
Example 2:
  Input:
  fnName = "factorial"
  actions = ["call","call","call","getCallCount","call","getCallCount"]
  values = [[2],[3],[2],[],[3],[]]
  Output: [2,6,2,2,6,2]
  Explanation:
  const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));
  const memoFactorial = memoize(factorial);
  memoFactorial(2); // "call" - returns 2.
  memoFactorial(3); // "call" - returns 6.
  memoFactorial(2); // "call" - returns 2. However factorial was not called because 2 was seen before.
  // "getCallCount" - total call count: 2
  memoFactorial(3); // "call" - returns 6. However factorial was not called because 3 was seen before.
  // "getCallCount" - total call count: 2
```

```
Example 3:
  Input:
  fnName = "fib"
  actions = ["call","getCallCount"]
  values = [[5],[]]
  Output: [8,1]
  Explanation:
  fib(5) = 8 // "call"
  // "getCallCount" - total call count: 1
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
