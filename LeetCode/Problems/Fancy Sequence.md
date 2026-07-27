# 1622. Fancy Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/fancy-sequence](https://leetcode.com/problems/fancy-sequence)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Design a data structure supporting `append(val)`, `addAll(inc)` (add `inc` to all elements), `multAll(m)` (multiply all elements by `m`), and `getIndex(idx)` (return element at index, mod 10⁹+7). All operations must be efficient.

---

## Key Insight

> Track a global **affine transformation** `f(x) = x * mult + add`. When `addAll(inc)`: `add += inc`. When `multAll(m)`: `mult *= m, add *= m`. On `getIndex`, apply the transformation that accumulated **after** this element was appended (use modular inverse to "undo" the global state at append time).

---

## Approach: Lazy Affine Transformation — O(1) per operation ✅

```
CLASS Fancy:
    MOD = 10^9 + 7
    vals = []; mults = []; adds = []
    globalMult = 1; globalAdd = 0

    FUNCTION append(val):
        // Store the "inverse" of current global transform
        vals.ADD(val)
        mults.ADD(globalMult)
        adds.ADD(globalAdd)

    FUNCTION addAll(inc):
        globalAdd = (globalAdd + inc) % MOD

    FUNCTION multAll(m):
        globalMult = (globalMult * m) % MOD
        globalAdd = (globalAdd * m) % MOD

    FUNCTION getIndex(idx):
        IF idx >= len(vals): RETURN -1
        // Apply delta transform since append time
        m = globalMult * MODINV(mults[idx]) % MOD
        a = (globalAdd - adds[idx] * m) % MOD
        RETURN (vals[idx] * m + a) % MOD
```

---

## Complexity Analysis

| Operation | Complexity |
|-----------|-----------|
| **append** | O(1) |
| **addAll/multAll** | O(1) |
| **getIndex** | O(log MOD) for modular inverse |

---

## Key Takeaway

> **Lazy affine transformations: compose multiply/add into a global `(mult, add)` state. On query, compute the delta transform since insertion using modular inverse. Avoids updating all elements on each operation.**
