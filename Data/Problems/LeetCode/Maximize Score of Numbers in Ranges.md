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

You are given an array of integers `start` and an integer `d`, representing `n` intervals `[start[i], start[i] + d]`.

You are asked to choose `n` integers where the `i^th` integer must belong to the `i^th` interval. The **score** of the chosen integers is defined as the **minimum** absolute difference between any two integers that have been chosen.

Return the **maximum** *possible score* of the chosen integers.

**Constraints:**
- `2 <= start.length <= 10^5`
- `0 <= start[i] <= 10^9`
- `0 <= d <= 10^9`

---

## Examples

**Example 1:**
```
Input: start = [6,0,3], d = 2
Output: 4
Explanation: The maximum possible score can be obtained by choosing integers: 8, 0, and 4. The score of these chosen integers is min(|8 - 0|, |8 - 4|, |0 - 4|) which equals 4.
```

**Example 2:**
```
Input: start = [2,6,13,13], d = 5
Output: 5
Explanation: The maximum possible score can be obtained by choosing integers: 2, 7, 13, and 18. The score of these chosen integers is min(|2 - 7|, |2 - 13|, |2 - 18|, |7 - 13|, |7 - 18|, |13 - 18|) which equals 5.
```

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
