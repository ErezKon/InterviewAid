# 888. Fair Candy Swap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fair-candy-swap](https://leetcode.com/problems/fair-candy-swap)
**Companies:** Amazon, Bloomberg, Fidessa, Google, Meta, Microsoft, Swiggy

---

## Problem Description

Alice and Bob have candy bars of different sizes. Find one bar from each to swap so both end up with the **same total**. Return `[aliceBar, bobBar]`.

---

## Key Insight

> After swapping bar `a` (Alice) for bar `b` (Bob): `sumA - a + b = sumB - b + a` → `b = a - (sumA - sumB) / 2`. Compute the diff, then for each of Alice's bars, check if the needed Bob bar exists in a set.

---

## Approach: Set Lookup — O(n + m) ✅

```
FUNCTION fairCandySwap(aliceSizes, bobSizes):
    diff = (SUM(aliceSizes) - SUM(bobSizes)) / 2
    bobSet = SET(bobSizes)
    FOR a IN aliceSizes:
        IF a - diff IN bobSet:
            RETURN [a, a - diff]
```

---

## Key Takeaway

> **Math reduces swap problem to a lookup: `b = a - diff`. Use a set for O(1) existence checks. Classic two-sum variant.**
