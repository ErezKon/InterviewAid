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

Given a function `fn`, return a **memoized** version of that function.

A **memoized** function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

`fn` can be any function and there are no constraints on what type of values it accepts. Inputs are considered identical if they are `===` to each other.

**Constraints:**
- `1 ≤ inputs.length ≤ 10⁵`
- `0 ≤ inputs.flat().length ≤ 10⁵`
- `inputs[i][j] != NaN`

---

## Examples

```
Example 1:
  Input:
  getInputs = () => [[2,2],[2,2],[1,2]]
  fn = function (a, b) { return a + b; }
  Output: [{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
  Explanation:
  const inputs = getInputs();
  const memoized = memoize(fn);
  for (const arr of inputs) {
    memoized(...arr);
  }

  For the inputs of (2, 2): 2 + 2 = 4, and it required a call to fn().
  For the inputs of (2, 2): 2 + 2 = 4, but those inputs were seen before so no call to fn() was required.
  For the inputs of (1, 2): 1 + 2 = 3, and it required another call to fn() for a total of 2.
```

```
Example 2:
  Input:
  getInputs = () => [[{},{}],[{},{}],[{},{}]]
  fn = function (a, b) { return ({...a, ...b}); }
  Output: [{"val":{},"calls":1},{"val":{},"calls":2},{"val":{},"calls":3}]
  Explanation:
  Merging two empty objects will always result in an empty object. It may seem like there should only be 1 call to fn() because of cache-hits, however none of those objects are === to each other.
```

```
Example 3:
  Input:
  getInputs = () => { const o = {}; return [[o,o],[o,o],[o,o]]; }
  fn = function (a, b) { return ({...a, ...b}); }
  Output: [{"val":{},"calls":1},{"val":{},"calls":1},{"val":{},"calls":1}]
  Explanation:
  Merging two empty objects will always result in an empty object. The 2nd and 3rd third function calls result in a cache-hit. This is because every object passed in is identical.
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
