# 3194. Minimum Average of Smallest and Largest Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements](https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements)
**Companies:** Amazon, Google

---

## Key Insight

> Sort, then repeatedly pair the smallest and largest remaining elements. The minimum average across all such pairs is the answer.

---

## Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION minimumAverage(nums):
    SORT nums
    minAvg ← INFINITY
    lo ← 0, hi ← LEN(nums) - 1
    WHILE lo < hi DO
        minAvg ← MIN(minAvg, (nums[lo] + nums[hi]) / 2.0)
        lo ← lo + 1
        hi ← hi - 1
    RETURN minAvg
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + pair | **O(n log n)** | **O(1)** |

---

## Key Takeaway

> **Pair extremes and take minimum average** — sort and pair from both ends inward.

---
