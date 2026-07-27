# 2256. Minimum Average Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-average-difference](https://leetcode.com/problems/minimum-average-difference)
**Companies:** Amazon, Meta

---

## Key Insight

> Use prefix sums. For index `i`, left average = `prefix[i+1] / (i+1)`, right average = `(total - prefix[i+1]) / (n-i-1)`. Minimize the absolute difference.

---

## Approach: Prefix Sum — O(n) ✅

```
FUNCTION minimumAverageDifference(nums):
    n ← LEN(nums)
    total ← SUM(nums)
    leftSum ← 0
    minDiff ← INFINITY
    result ← 0
    
    FOR i ← 0 TO n-1 DO
        leftSum ← leftSum + nums[i]
        leftAvg ← leftSum / (i + 1)
        rightAvg ← (total - leftSum) / (n - i - 1) IF i < n-1 ELSE 0
        diff ← ABS(leftAvg - rightAvg)
        IF diff < minDiff THEN
            minDiff ← diff
            result ← i
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix sum | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Running prefix sum for split-point problems** — compute left/right averages incrementally to find the optimal split in O(n).

---
