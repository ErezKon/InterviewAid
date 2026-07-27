# 3224. Minimum Array Changes to Make Differences Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-changes-to-make-differences-equal](https://leetcode.com/problems/minimum-array-changes-to-make-differences-equal)
**Companies:** Airbus, Google

---

## Key Insight

> For each mirrored pair `(nums[i], nums[n-1-i])`, compute what target difference values `d` are achievable with 0, 1, or 2 changes. Use a **difference array** over possible `d` values to efficiently count changes needed across all pairs.

---

## Approach: Difference Array — O(n + k) ✅

```
FUNCTION minChanges(nums, k):
    n ← LEN(nums)
    // diff array tracks change cost for each possible target difference d
    diff ← ARRAY(k + 2, 0)
    
    FOR i ← 0 TO n/2 - 1 DO
        a ← nums[i], b ← nums[n-1-i]
        curDiff ← ABS(a - b)
        maxReach ← MAX(MAX(a, b), k - MIN(a, b))
        
        // d = curDiff → 0 changes
        // d ∈ [0, maxReach] → 1 change
        // d > maxReach → 2 changes
        diff[0] ← diff[0] + 1           // at least 1 change for d=0..maxReach
        diff[curDiff] ← diff[curDiff] - 1  // 0 changes at curDiff
        diff[curDiff+1] ← diff[curDiff+1] + 1
        diff[maxReach+1] ← diff[maxReach+1] + 1  // 2 changes beyond maxReach
    
    // Prefix sum to get actual costs
    result ← INFINITY
    running ← 0
    FOR d ← 0 TO k DO
        running ← running + diff[d]
        result ← MIN(result, running)
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Difference array | **O(n + k)** | **O(k)** |

---

## Key Takeaway

> **Difference array for range updates** — for each pair, mark cost ranges for different target differences, then sweep to find the optimal `d` with minimum total changes.

---
