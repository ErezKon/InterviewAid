# 3281. Maximize Score of Numbers in Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-score-of-numbers-in-ranges](https://leetcode.com/problems/maximize-score-of-numbers-in-ranges)
**Companies:** Amazon, De Shaw

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search — O(n log n + n log V)](#approach-binary-search--on-log-n--n-log-v-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of starting points `start` and an integer `d`, each element `i` can choose a value in `[start[i], start[i] + d]`. The **score** is the minimum absolute difference between any two chosen values. Maximize this score.

**Constraints:**
- `2 ≤ n ≤ 10⁵`
- `0 ≤ start[i] ≤ 10⁹`
- `0 ≤ d ≤ 10⁹`

---

## Examples

**Example 1:**
```
start = [1, 3, 6]
d = 2
```
Choosing values `[1, 5, 8]` yields gaps `4` and `3`; the minimum gap is `3`. No other assignment can achieve a larger minimum gap, so the answer is `3`.

**Example 2:**
```
start = [0, 0, 0]
d = 5
```
We can pick `[0, 5, 10]` (by treating the third element as `0 + 2*d`). The minimum gap is `5`, which is optimal.

---

## Approach: Binary Search — O(n log n + n log V) ✅

```
FUNCTION maxScore(start, d):
    SORT start
    lo, hi = 0, start[-1] + d - start[0]

    FUNCTION canAchieve(gap):
        prev = start[0]    // assign first as early as possible
        FOR i ← 1 TO n - 1:
            next = MAX(start[i], prev + gap)
            IF next > start[i] + d: RETURN False
            prev = next
        RETURN True

    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF canAchieve(mid): lo = mid
        ELSE: hi = mid - 1

    RETURN lo
```

---

## Walkthrough

| Step | `prev` (last placed) | `i` | `start[i]` | `next = max(start[i], prev+gap)` | Feasible? |
|------|----------------------|-----|------------|----------------------------------|----------|
| 1    | 1 (first element)   | 1   | 3          | max(3, 1+gap)                    | — |
| 2    | ...                  | ... | ...        | ...                              | ... |

Assuming a candidate `gap = 3`:
1. Place first value at `1`.
2. For `i=1`, `prev+gap = 4`; `start[1]=3`, so `next = 4` (within `[3,5]`).
3. For `i=2`, `prev+gap = 7`; `start[2]=6`, so `next = 7` (within `[6,8]`).
All placements succeed, so gap `3` is achievable. Binary search confirms it is maximal.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Binary Search | **O(n log n + n log V)** | O(1) |

---

## Key Takeaway

> **"Maximize the minimum gap" → binary search on the answer + greedy validation.** Sort the ranges, then greedily place each value as early as possible while respecting the minimum gap constraint.
