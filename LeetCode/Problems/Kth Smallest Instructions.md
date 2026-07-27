# 1643. Kth Smallest Instructions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/kth-smallest-instructions](https://leetcode.com/problems/kth-smallest-instructions)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Combinatorics — O(m+n) ✅](#3-approach-combinatorics--omn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given destination `[row, col]`, you must reach it from `(0,0)` using only 'H' (right) and 'V' (down) moves. Return the k-th lexicographically smallest instruction string.

---

## 2. Key Insight

The string has `col` H's and `row` V's. At each position, decide: if we place 'H', how many strings start with 'H'? That's `C(remaining_H + remaining_V - 1, remaining_V)`. If `k ≤ count`, place 'H'; otherwise place 'V' and subtract count from k.

---

## 3. Approach: Combinatorics — O(m+n) ✅

```
FUNCTION kthSmallestPath(destination, k):
    v, h = destination[0], destination[1]
    result = []

    FOR each position:
        IF h > 0:
            count = C(h + v - 1, v)  // strings starting with 'H'
            IF k <= count:
                result.ADD('H')
                h -= 1
            ELSE:
                k -= count
                result.ADD('V')
                v -= 1
        ELSE:
            result.ADD('V')
            v -= 1

    RETURN "".join(result)
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m + n) | One pass through all positions |
| Space | O(m + n) | Result string |

---

## 5. Key Takeaway

> Use combinatorics to count how many strings start with 'H' at each position. This is the same technique as finding the k-th permutation — count and skip.
