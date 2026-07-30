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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given destination `[row, col]`, you must reach it from `(0,0)` using only 'H' (right) and 'V' (down) moves. Return the k-th lexicographically smallest instruction string.

---

## 2. Key Insight

The string has `col` H's and `row` V's. At each position, decide: if we place 'H', how many strings start with 'H'? That's `C(remaining_H + remaining_V - 1, remaining_V)`. If `k ≤ count`, place 'H'; otherwise place 'V' and subtract count from k.

---

## 3. Approach: Combinatorics — O(m+n) ✅

```text
FUNCTION kthSmallestPath(destination, k):
    v ← destination[0]
    h ← destination[1]
    result ← []
    WHILE h > 0 OR v > 0:
        IF h > 0:
            count ← COMBINATION(h + v - 1, v)  // strings starting with 'H'
            IF k ≤ count:
                result.ADD('H')
                h ← h - 1
                CONTINUE
            ELSE:
                k ← k - count
        // place a 'V'
        result.ADD('V')
        v ← v - 1
    RETURN JOIN(result)
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m + n) | One pass through all positions |
| Space | O(m + n) | Result string |

---

## 5. Examples

| destination | k | Output |
|-------------|---|--------|
| [2,3] | 3 | "HHVHV" |
| [1,2] | 2 | "HVH" |

*Explanation:* For `[2,3]` there are `C(5,2)=10` possible strings. The 3rd lexicographically is `HHVHV`.

---

## 6. Walkthrough

Consider `destination = [2,3]`, `k = 3`.

1. **Start:** h=3, v=2, k=3.
2. **Count if 'H' first:** `C(4,2)=6`. Since 3 ≤ 6, place 'H'. h=2.
3. **Next position:** h=2, v=2, k=3.
   - Count if 'H': `C(3,2)=3`. 3 ≤ 3 → place 'H'. h=1.
4. **Next:** h=1, v=2, k=3.
   - Count if 'H': `C(2,2)=1`. 3 > 1 → skip 'H', set k=2, place 'V'. v=1.
5. **Next:** h=1, v=1, k=2.
   - Count if 'H': `C(1,1)=1`. 2 > 1 → skip 'H', k=1, place 'V'. v=0.
6. **Remaining:** only H's left → add 'H' twice.
Result string: `HHVHV`.

---

## 7. Key Takeaway

> Use combinatorics to count how many strings start with 'H' at each position. This is the same technique as finding the k-th permutation — count and skip.
