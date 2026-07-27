# 2340. Minimum Adjacent Swaps to Make a Valid Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array](https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array)
**Companies:** Amazon

---

## Key Insight

> A valid array has the minimum at the start and maximum at the end. Find the leftmost minimum and rightmost maximum, then count swaps to move them into position. Subtract 1 if the min position was originally to the right of the max position (they cross).

---

## Approach

```
FUNCTION minimumSwaps(nums):
    n ← LEN(nums)
    minIdx ← INDEX of leftmost MIN(nums)
    maxIdx ← INDEX of rightmost MAX(nums)
    
    swaps ← minIdx + (n - 1 - maxIdx)
    IF minIdx > maxIdx THEN swaps ← swaps - 1
    RETURN swaps
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Position-based counting** — count swaps to move min left and max right, adjusting for crossing paths.

---
