# 3091. Apply Operations to Make Sum of Array Greater Than or Equal to k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k](https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k)
**Companies:** Turing, Zscaler

---

## 1. Problem Description

Given an array starting as `[1]`, you can perform operations: either increment an element by 1, or duplicate an element. Find the minimum number of operations to make the array sum ≥ `k`.

---

## 2. Key Insight

> It's optimal to increment a single element first (from 1 to some value `v`), then duplicate it. With `v-1` increments and `⌈k/v⌉ - 1` duplicates, the total ops = `(v-1) + (⌈k/v⌉ - 1)`. Minimize over `v`.

---

## 3. Approach: Math Optimization — O(√k) ✅

```
FUNCTION minOperations(k):
    IF k <= 1: RETURN 0
    best = k - 1  // worst case: increment k-1 times
    FOR v FROM 1 TO k:
        copies = CEIL(k / v) - 1
        ops = (v - 1) + copies
        best = MIN(best, ops)
        IF v * v >= k: BREAK  // optimal is near √k
    RETURN best
```

| Time | Space |
|------|-------|
| O(√k) | O(1) |

---

## Key Takeaway

> Increment-then-duplicate problems have an optimal balance point near `√k`: increment to `√k`, then duplicate `√k` times, giving ~`2√k` total operations.
