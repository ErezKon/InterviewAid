# 2625. Flatten Deeply Nested Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flatten-deeply-nested-array](https://leetcode.com/problems/flatten-deeply-nested-array)
**Companies:** Google, Meta, Otterai, Paypal, Rivian, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Recursive Flatten — O(n) ✅](#2-approach-recursive-flatten--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a multi-dimensional array `arr` and depth `n`, flatten it up to `n` levels deep. (JavaScript problem)

---

## 2. Approach: Recursive Flatten — O(n) ✅

```
FUNCTION flatten(arr, n):
    IF n == 0:
        RETURN COPY(arr)
    SET result ← []
    FOR each item IN arr:
        IF item IS ARRAY AND n > 0:
            SET flattened ← flatten(item, n - 1)
            EXTEND result WITH flattened
        ELSE:
            APPEND item TO result
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: arr = [1, [2, [3, 4]], 5], n = 1
Output: [1, 2, [3, 4], 5]
```
Explanation: Only the first level of nesting is flattened.

**Example 2:**
```
Input: arr = [1, [2, [3, 4]], 5], n = 2
Output: [1, 2, 3, 4, 5]
```
Explanation: Two levels are flattened, resulting in a fully flat array.

---

## Walkthrough

| Call | n | Action |
|------|---|--------|
| flatten([1, [2, [3,4]], 5], 2) | 2 | Iterate items; encounter sub‑array `[2, [3,4]]` → recursive call.
| flatten([2, [3,4]], 1) | 1 | Flatten first level: result `[2, [3,4]]`.
| Combine results → `[1] + [2, [3,4]] + [5]` → `[1,2,[3,4],5]`.
| Since outer call had n=2, the returned `[1,2,[3,4],5]` is processed again, flattening inner `[3,4]` → final `[1,2,3,4,5]`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(N) – each element visited once |
| **Space** | O(D) – recursion depth proportional to nesting depth |

---

## Follow-Up Questions

- How would you modify the algorithm to flatten the array in‑place?
- Can you implement an iterative version using a stack?
- What changes are needed to support streaming input where the array is too large to fit in memory?

---

## 3. Key Takeaway

> Recursively flatten each sub‑array, decreasing the depth counter `n` until it reaches zero. Each level processes its elements once, yielding O(N) time.
