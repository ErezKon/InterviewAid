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

There are some prizes on the **X-axis**. You are given an integer array `prizePositions` that is **sorted in non-decreasing order**, where `prizePositions[i]` is the position of the `i^th` prize. There could be different prizes at the same position on the line. You are also given an integer `k`.

You are allowed to select two segments with integer endpoints. The length of each segment must be `k`. You will collect all prizes whose position falls within at least one of the two selected segments (including the endpoints of the segments). The two selected segments may intersect.

- For example if `k = 2`, you can choose segments `[1, 3]` and `[2, 4]`, and you will win any prize i that satisfies `1 <= prizePositions[i] <= 3` or `2 <= prizePositions[i] <= 4`.

Return *the **maximum** number of prizes you can win if you choose the two segments optimally*.

**Constraints:**
- `1 <= prizePositions.length <= 10^5`
- `1 <= prizePositions[i] <= 10^9`
- `0 <= k <= 10^9 `
- `prizePositions` is sorted in non-decreasing order.

---

## Examples

**Example 1:**
```
Input: prizePositions = [1,1,2,2,3,3,5], k = 2
Output: 7
Explanation: In this example, you can win all 7 prizes by selecting two segments [1, 3] and [3, 5].
```

**Example 2:**
```
Input: prizePositions = [1,2,3,4], k = 0
Output: 2
Explanation: For this example, one choice for the segments is [3, 3] and [4, 4], and you will be able to get 2 prizes.
```

---

## Key Insight

> Use a sliding window for the right segment. For the left segment, precompute `prefixMax[i]` = max prizes covered by any single segment ending at or before position i. For each right segment [r-k, r], the total = prizes in this segment + prefixMax[start of this segment - 1].

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
   - `right=2`: window size 3 (positions 1-3), `count=3`, `result=3`, `prefixMax[3]=3`.
   - `right=3`: window exceeds k (4-1 >2), move `left` to 1, window size 3 (2-4), `count=3`, `result = MAX(3, 3 + prefixMax[1]=1) = 4`.
   - Continue similarly; final `result` becomes 5.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window + Prefix Max | **O(n)** | O(n) |

---

## Key Takeaway

> **Two non-overlapping segments: use sliding window for one, prefix max for the other.** This is the classic "two intervals" optimization pattern.
