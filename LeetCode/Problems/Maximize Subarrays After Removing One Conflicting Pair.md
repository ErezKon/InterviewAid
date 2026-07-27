# 3480. Maximize Subarrays After Removing One Conflicting Pair

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair](https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sweep Line + Difference Array — O(n + m)](#approach-sweep-line--difference-array--on--m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of length `n` and `m` conflicting pairs (pairs of indices that cannot both appear in a subarray), find the maximum number of valid subarrays (containing no conflicting pair) after removing exactly **one** conflicting pair.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ m ≤ 10⁵`

---

## Key Insight

> Each conflicting pair `(a, b)` with `a < b` blocks all subarrays `[l, r]` where `l ≤ a` and `r ≥ b`. Removing one pair "unblocks" those subarrays. Use a sweep line to compute for each pair, how many subarrays it uniquely blocks (blocked only by this pair). The best pair to remove is the one that uniquely blocks the most subarrays.

---

## Approach: Sweep Line + Difference Array — O(n + m) ✅

```
FUNCTION maxSubarrays(n, conflicts):
    // For each left endpoint l, find the rightmost valid r (before any conflict)
    // Use sweep line: sort conflicts, track the closest blocker per position
    
    // Compute baseline valid subarrays without any removal
    // For each conflict pair, compute the gain from removing it
    // Use difference arrays to aggregate contributions efficiently
    
    baseline = computeValidSubarrays(n, conflicts)
    bestGain = 0
    FOR each conflict c:
        gain = subarraysUniqelyBlockedBy(c)
        bestGain = MAX(bestGain, gain)
    
    RETURN baseline + bestGain
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sweep line + difference array | **O(n + m)** | O(n + m) |

---

## Key Takeaway

> **For "remove one constraint to maximize valid structures," compute the gain from removing each constraint using sweep line / difference array techniques.** The constraint that uniquely blocks the most structures is the best to remove.
