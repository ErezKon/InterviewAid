# 2064. Minimized Maximum of Products Distributed to Any Store

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Siemens

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` stores and `m` product types with `quantities[i]` units each, distribute products so each store gets at most one product type. Minimize the **maximum** number of products any store receives.

**Constraints:**
- `m ≤ n ≤ 10⁵`
- `1 ≤ quantities[i] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  n = 6, quantities = [11, 6]
Output: 3
Explanation: Distribute 11 across 4 stores (3,3,3,2), 6 across 2 stores (3,3). Max = 3.
```

---

## Key Insight

> **Binary search on the answer.** For a candidate max `x`, each product type `q` needs `⌈q/x⌉` stores. Check if total stores needed ≤ `n`.

---

## Approach: Binary Search — O(m log max) ✅

```
FUNCTION minimizedMaximum(n, quantities):
    lo ← 1
    hi ← MAX(quantities)

    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        stores ← SUM(CEIL(q / mid) FOR q IN quantities)
        IF stores ≤ n THEN hi ← mid
        ELSE lo ← mid + 1

    RETURN lo
```

---

## Walkthrough

```
n = 6, quantities = [11, 6]

lo=1, hi=11
mid=6: stores = ⌈11/6⌉+⌈6/6⌉ = 2+1 = 3 ≤ 6 → hi=6
mid=3: stores = ⌈11/3⌉+⌈6/3⌉ = 4+2 = 6 ≤ 6 → hi=3
mid=2: stores = ⌈11/2⌉+⌈6/2⌉ = 6+3 = 9 > 6 → lo=3

Return 3 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search | **O(m · log(max))** | **O(1)** |

---

## Key Takeaway

> **Binary search on max allocation** — classic "minimize the maximum" pattern. For each candidate, check feasibility by counting required stores with ceiling division.

---
