# 3449. Maximize the Minimum Game Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-minimum-game-score](https://leetcode.com/problems/maximize-the-minimum-game-score)
**Companies:** Amazon, Infosys

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search on Answer — O(n log V)](#approach-binary-search-on-answer--on-log-v-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given game scores, maximize the **minimum score** across all participants through optimal strategy. The exact mechanism varies, but the core pattern is maximizing the minimum.

---

## Key Insight

> **"Maximize the minimum"** → binary search on the answer. For each candidate minimum `m`, check if it's achievable with a greedy or DP verification function.

---

## Approach: Binary Search on Answer — O(n log V) ✅

```
FUNCTION maxMinScore(scores, ...):
    lo, hi = 0, MAX(scores)
    
    FUNCTION canAchieve(minScore):
        // Greedy check: can all scores be made >= minScore?
        RETURN feasible
    
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
| Binary Search + Greedy | **O(n log V)** | O(n) |

---

## Key Takeaway

> **"Maximize the minimum" is the canonical binary search on answer pattern.** Binary search the threshold, greedily verify feasibility.
