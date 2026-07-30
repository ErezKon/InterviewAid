# 1627. Graph Connectivity With Threshold

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/graph-connectivity-with-threshold](https://leetcode.com/problems/graph-connectivity-with-threshold)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find with Factor Enumeration — O(n log n) ✅](#3-approach-union-find-with-factor-enumeration)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given `n` cities labeled `1` to `n` and an integer `threshold`, two cities are considered directly connected if they share a common factor greater than `threshold`. For multiple queries `(a, b)`, determine whether city `a` and city `b` are connected either directly or via a chain of such connections.

---

## 2. Key Insight

> Instead of checking all pairs `O(n²)`, iterate over each factor `f > threshold` and union all multiples of `f`. This is analogous to a sieve and runs in `O(n log n)`.

---

## 3. Approach: Union-Find with Factor Enumeration — O(n log n) ✅

```text
FUNCTION areConnected(n, threshold, queries):
    uf ← UNION_FIND of size n + 1
    FOR f ← threshold + 1 TO n:
        FOR multiple ← 2 * f TO n STEP f:
            uf.UNION(f, multiple)
    results ← []
    FOR (a, b) IN queries:
        IF uf.FIND(a) = uf.FIND(b):
            APPEND results WITH true
        ELSE:
            APPEND results WITH false
    RETURN results
```

---

## 4. Examples

| n | threshold | queries | Output |
|---|-----------|---------|--------|
| 6 | 2 | `[(1,4),(2,5),(3,6)]` | `[false, true, true]` |
| 10 | 0 | `[(6,10),(2,5)]` | `[true, false]` |

*Explanation*: In the first case, cities `2` and `4` share factor `2` (>2) so they are connected, while `1` and `4` have no common factor >2.

---

## 5. Walkthrough

Consider `n = 6`, `threshold = 2`.

1. Initialize Union-Find for `1..6`.
2. Enumerate factors `f = 3,4,5,6` (since >2).
   - `f = 3`: multiples `6` → union(3,6).
   - `f = 4`: no multiple ≤6.
   - `f = 5`: no multiple ≤6.
   - `f = 6`: no multiple.
3. After unions, sets are `{1}`, `{2}`, `{3,6}`, `{4}`, `{5}`.
4. Query `(3,6)`: both in same set → `true`.
5. Query `(1,4)`: different sets → `false`.

---

## 6. Complexity Analysis

- **Time:** `O(n log n + q α(n))` where `q` is number of queries and `α` is inverse Ackermann (practically constant).
- **Space:** `O(n)` for the Union-Find parent and rank arrays.

---

## 7. Follow-Up Questions

- How would the solution change if the connectivity condition were based on greatest common divisor ≥ `threshold` instead of a common factor > `threshold`?
- Can you adapt the algorithm to handle dynamic updates where new cities or edges are added after preprocessing?
- What if the graph is directed and connectivity requires a directed path respecting the factor rule?

---

## Key Takeaway

> Use a sieve‑style enumeration of factors greater than the threshold and Union‑Find to merge all cities sharing each factor. This avoids quadratic pair checks and yields near‑linear preprocessing.
