# 2568. Minimum Impossible OR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-impossible-or](https://leetcode.com/problems/minimum-impossible-or)
**Companies:** Amazon

---

## Problem Description

Given an array `nums`, find the **smallest positive integer** that cannot be represented as the OR of any subset of `nums`.

## Key Insight

> The answer is always a **power of 2**. If all powers of 2 up to 2^k are present, every number up to 2^(k+1)-1 can be formed by OR. The first missing power of 2 is the answer.

## Approach: Check Powers of 2 — O(n) ✅

```
FUNCTION minImpossibleOR(nums):
    numSet ← SET(nums)
    power ← 1
    WHILE power IN numSet:
        power ← power * 2
    RETURN power
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

## Key Takeaway

> OR can combine any subset, but each power of 2 sets a unique bit. The first missing power of 2 can never be formed by OR of elements without it.
