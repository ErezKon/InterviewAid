# 1622. Fancy Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/fancy-sequence](https://leetcode.com/problems/fancy-sequence)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Design a data structure supporting `append(val)`, `addAll(inc)` (add `inc` to all elements), `multAll(m)` (multiply all elements by `m`), and `getIndex(idx)` (return element at index, mod 10⁹+7). All operations must be efficient.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `append(2)`, `addAll(3)`, `getIndex(0)` | `5` | After appending 2, adding 3 yields 5. |
| `append(1)`, `multAll(2)`, `addAll(1)`, `getIndex(1)` | `3` | Value 1 becomes 2 after multiply, then 3 after add. |

---

## Approach: Lazy Affine Transformation — O(1) per operation ✅

```text
CLASS Fancy:
    MOD = 10^9 + 7
    vals = []
    mults = []
    adds = []
    globalMult = 1
    globalAdd = 0

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

## Walkthrough

Consider the sequence of operations:
1. `append(2)` → store (2, mult=1, add=0)
2. `addAll(3)` → globalAdd=3
3. `append(5)` → store (5, mult=1, add=3)
4. `multAll(2)` → globalMult=2, globalAdd=6
5. `getIndex(0)` → m = 2 * MODINV(1) = 2, a = 6 - 0*2 = 6 → result = 2*2+6 = 10
6. `getIndex(1)` → m = 2 * MODINV(1) = 2, a = 6 - 3*2 = 0 → result = 5*2+0 = 10

---

## Complexity Analysis

| Operation | Complexity |
|-----------|-----------|
| **append** | O(1) |
| **addAll/multAll** | O(1) |
| **getIndex** | O(log MOD) for modular inverse |

---

## Follow-Up Questions

- How would you extend this structure to support `subtractAll`?
- Can you adapt the design for a streaming environment where values arrive continuously?
- What changes are needed if the modulus is not prime?

---

## Key Takeaway

> **Lazy affine transformations: compose multiply/add into a global `(mult, add)` state. On query, compute the delta transform since insertion using modular inverse. Avoids updating all elements on each operation.**