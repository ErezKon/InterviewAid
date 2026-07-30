# 2630. Memoize II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/memoize-ii](https://leetcode.com/problems/memoize-ii)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Implement a `memoize` function that takes a function `fn` and returns a **memoized** version. The memoized function caches results based on its arguments. Arguments can be of **any type** (objects, arrays, functions, primitives). Two calls with the same arguments (by reference for objects) should return the cached result.

**Constraints:**
- Arguments can be any JS type
- Object identity is by reference, not deep equality

---

## Examples

**Example 1:**
```
const fn = (a, b) => a + b;
const memoized = memoize(fn);
memoized(1, 2); // 3 (computed)
memoized(1, 2); // 3 (cached)
memoized(2, 1); // 3 (computed — different args)
```

---

## Key Insight

> Standard `Map` uses reference equality for objects but can't handle **multiple arguments** as a single key. Use a **nested Map (trie) structure**: for each argument position, traverse into a deeper Map. Store the result at the leaf. This gives O(k) lookup per call where k = number of arguments.

---

## Approach

```javascript
FUNCTION memoize(fn):
    cache ← new Map()
    resultSymbol ← Symbol("result")
    
    RETURN FUNCTION(...args):
        node ← cache
        FOR arg IN args DO
            IF node does not have key arg THEN
                node.set(arg, new Map())
            node ← node.get(arg)
        
        IF node has resultSymbol THEN
            RETURN node.get(resultSymbol)
        
        result ← fn(...args)
        node.set(resultSymbol, result)
        RETURN result
```

**Why a Symbol?** To distinguish between "this node has a cached result" and "this node is an intermediate Map in the trie." A Symbol key can't collide with any argument value.

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Lookup / Insert | **O(k)** per call | **O(n · k)** total |

Where `k` = number of arguments, `n` = number of unique call signatures.

---

## Follow-Up Questions

1. **Why not JSON.stringify for the key?** Objects with the same structure but different references should be treated as different. JSON also can't handle functions or circular references.
2. **Why not a WeakMap?** WeakMap doesn't support primitive keys. We need to handle both primitives and objects.
3. **How does this differ from Memoize I?** Memoize I only handles single-argument functions with primitive args. Memoize II handles arbitrary argument counts and types.
4. **What about memory leaks?** Since we use Map (not WeakMap), cached object references prevent garbage collection. A real implementation might add an eviction policy (LRU).

---

## Key Takeaway

> **Trie of Maps** is the canonical approach for memoizing functions with multiple arguments of arbitrary types — each argument level maps to a deeper Map node, with a Symbol-keyed result at the leaf.

---
