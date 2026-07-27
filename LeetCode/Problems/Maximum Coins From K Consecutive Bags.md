# 3413. Maximum Coins From K Consecutive Bags

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-coins-from-k-consecutive-bags](https://leetcode.com/problems/maximum-coins-from-k-consecutive-bags)
**Companies:** Amazon, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sweep Line + Sliding Window — O(n log n)](#approach-sweep-line--sliding-window--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given coin ranges `[l, r, coins]` (each bag in range [l,r] has `coins` coins), pick `k` **consecutive** bags to maximize total coins collected.

---

## Key Insight

> The optimal window of k consecutive bags either starts or ends at a boundary of some coin range. Enumerate all candidate starting positions (boundaries of ranges), compute the coins in each k-length window using prefix sums over the ranges.

---

## Approach: Sweep Line + Sliding Window — O(n log n) ✅

```
FUNCTION maxCoins(ranges, k):
    // Sort ranges by left endpoint
    // For each candidate window start (at range boundaries):
    //   Compute total coins in [start, start + k - 1]
    //   Using binary search + prefix sums on ranges
    
    SORT ranges by left
    // Build prefix sums of coin contributions
    // Try each range boundary as window start/end
    result = 0
    FOR each boundary position:
        window = [boundary, boundary + k - 1]
        coins = computeCoinsInWindow(ranges, window)
        result = MAX(result, coins)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + sweep | **O(n log n)** | O(n) |

---

## Key Takeaway

> **For "k consecutive" problems with ranges: the optimal window boundary aligns with a range boundary.** Enumerate boundary-aligned windows and compute each efficiently.
