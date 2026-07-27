# 624. Maximum Distance in Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-distance-in-arrays](https://leetcode.com/problems/maximum-distance-in-arrays)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Yahoo

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Track Global Min/Max — O(m)](#approach-track-global-minmax--om-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `m` sorted arrays, pick one element from two **different** arrays to maximize `|a - b|`.

---

## Key Insight

> Track the global min and max seen so far. For each new array, the best candidate is `max(currentMax - globalMin, globalMax - currentMin)`. Then update global min/max.

---

## Approach: Track Global Min/Max — O(m) ✅

```
FUNCTION maxDistance(arrays):
    globalMin = arrays[0][0]
    globalMax = arrays[0][-1]
    maxDist = 0

    FOR i ← 1 TO len(arrays) - 1:
        maxDist = MAX(maxDist,
            ABS(arrays[i][-1] - globalMin),
            ABS(globalMax - arrays[i][0]))
        globalMin = MIN(globalMin, arrays[i][0])
        globalMax = MAX(globalMax, arrays[i][-1])

    RETURN maxDist
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Track global extremes | **O(m)** | O(1) |

---

## Key Takeaway

> **"Different arrays" constraint: compare each array's endpoints against the running global min/max from previous arrays.** Update globals after comparison to ensure elements come from different arrays.
