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

## Key Insight

> Binary search on the answer (minimum gap). For a candidate gap `g`, greedily assign each range's value as early as possible while maintaining gap ≥ g from the previous assignment. Sort ranges by start point first.

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

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Binary Search | **O(n log n + n log V)** | O(1) |

---

## Key Takeaway

> **"Maximize the minimum gap" → binary search on the answer + greedy validation.** Sort the ranges, then greedily place each value as early as possible while respecting the minimum gap constraint.
