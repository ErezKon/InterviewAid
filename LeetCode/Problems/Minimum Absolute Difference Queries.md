# 1906. Minimum Absolute Difference Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-queries](https://leetcode.com/problems/minimum-absolute-difference-queries)
**Companies:** Google

---

## Key Insight

> Values are bounded (1 to 100). Use **prefix frequency arrays** — for each position, store cumulative counts of each value. For a query `[l, r]`, compute which values exist in the range and find the min gap between consecutive present values.

---

## Approach: Prefix Count — O(n·100 + q·100) ✅

```
FUNCTION minDifference(nums, queries):
    n ← LEN(nums)
    // prefix[i][v] = count of value v in nums[0..i-1]
    prefix ← ARRAY(n+1, 101, 0)
    FOR i ← 1 TO n DO
        FOR v ← 1 TO 100 DO
            prefix[i][v] ← prefix[i-1][v]
        prefix[i][nums[i-1]] ← prefix[i][nums[i-1]] + 1
    
    result ← []
    FOR [l, r] IN queries DO
        prev ← -1
        minDiff ← INFINITY
        FOR v ← 1 TO 100 DO
            IF prefix[r+1][v] - prefix[l][v] > 0 THEN
                IF prev ≠ -1 THEN
                    minDiff ← MIN(minDiff, v - prev)
                prev ← v
        result.ADD(minDiff IF minDiff ≠ INFINITY ELSE -1)
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix counts | **O(100·(n + q))** | **O(100·n)** |

---

## Key Takeaway

> **Bounded values enable prefix counting** — when values are small, prefix frequency arrays answer range queries in O(maxVal) per query.

---
