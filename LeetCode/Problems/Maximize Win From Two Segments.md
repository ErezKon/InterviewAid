# 2555. Maximize Win From Two Segments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-win-from-two-segments](https://leetcode.com/problems/maximize-win-from-two-segments)
**Companies:** Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sliding Window + Prefix Max — O(n)](#approach-sliding-window--prefix-max--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a sorted array of prize positions and a segment length `k`, place **two non-overlapping** segments of length `k` to cover the maximum number of prizes. Return the maximum count.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- Positions are sorted.

---

## Key Insight

> Use a sliding window for the right segment. For the left segment, precompute `prefixMax[i]` = max prizes covered by any single segment ending at or before position i. For each right segment [r-k, r], the total = prizes in this segment + prefixMax[start of this segment - 1].

---

## Approach: Sliding Window + Prefix Max — O(n) ✅

```
FUNCTION maximizeWin(prizePositions, k):
    n = len(prizePositions)
    prefixMax = [0] * (n + 1)    // best single segment ending at or before index i
    result = 0; left = 0

    FOR right ← 0 TO n - 1:
        WHILE prizePositions[right] - prizePositions[left] > k:
            left += 1
        count = right - left + 1
        // Combine with best segment before this one
        result = MAX(result, count + prefixMax[left])
        prefixMax[right + 1] = MAX(prefixMax[right], count)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window + Prefix Max | **O(n)** | O(n) |

---

## Key Takeaway

> **Two non-overlapping segments: use sliding window for one, prefix max for the other.** This is the classic "two intervals" optimization pattern.
