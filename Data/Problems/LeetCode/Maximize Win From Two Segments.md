# 2555. Maximize Win From Two Segments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-win-from-two-segments](https://leetcode.com/problems/maximize-win-from-two-segments)
**Companies:** Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sliding Window + Prefix Max — O(n)](#approach-sliding-window--prefix-max--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a sorted array of prize positions and a segment length `k`, place **two non-overlapping** segments of length `k` to cover the maximum number of prizes. Return the maximum count.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- Positions are sorted.

---

## Examples

**Example 1:**
```
Input: prizePositions = [1,2,3,4,5,6], k = 2
Output: 5
Explanation: Place first segment covering positions [1,2,3] (length 2 covers positions 1‑3) and second segment covering [5,6]. Total prizes covered = 3 + 2 = 5.
```

**Example 2:**
```
Input: prizePositions = [10,20,30,40], k = 0
Output: 2
Explanation: Each segment can cover only a single position. Choose any two positions, total = 2.
```

---

## Key Insight

> Use a sliding window for the right segment. For the left segment, precompute `prefixMax[i]` = max prizes covered by any single segment ending at or before position i. For each right segment [r‑k, r], the total = prizes in this segment + prefixMax[start of this segment - 1].

---

## Approach: Sliding Window + Prefix Max — O(n) ✅

```text
FUNCTION maximizeWin(prizePositions, k):
    n = len(prizePositions)
    prefixMax = array of size n+1 initialized to 0
    result = 0
    left = 0

    FOR right ← 0 TO n - 1:
        WHILE prizePositions[right] - prizePositions[left] > k:
            left += 1
        count = right - left + 1
        // Combine with best segment before this one
        result = MAX(result, count + prefixMax[left])
        // Update prefix max for segments ending at this index
        prefixMax[right + 1] = MAX(prefixMax[right], count)

    RETURN result
```

---

## Walkthrough

Consider `prizePositions = [1,2,3,4,5,6]`, `k = 2`.
1. Initialize `left = 0`.
2. Expand `right`:
   - `right=0`: window size 1, `count=1`, `result=1`, `prefixMax[1]=1`.
   - `right=1`: window size 2, `count=2`, `result=2`, `prefixMax[2]=2`.
   - `right=2`: window size 3 (positions 1‑3), `count=3`, `result=3`, `prefixMax[3]=3`.
   - `right=3`: window exceeds k (4‑1 >2), move `left` to 1, window size 3 (2‑4), `count=3`, `result = MAX(3, 3 + prefixMax[1]=1) = 4`.
   - Continue similarly; final `result` becomes 5.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window + Prefix Max | **O(n)** | O(n) |

---

## Key Takeaway

> **Two non-overlapping segments: use sliding window for one, prefix max for the other.** This is the classic "two intervals" optimization pattern.
