# 462. Minimum Moves to Equal Array Elements II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii)
**Companies:** Amazon, Google, Microsoft, Myntra, Tcs

---

## Problem Description

Given an integer array, return the **minimum number of moves** to make all elements equal. One move = increment or decrement one element by 1.

## Key Insight

> The optimal target is the **median** — it minimizes sum of absolute deviations. Can use quickselect for O(n) average.

## Approach

The median of the sorted array yields the minimal total moves because it minimizes the sum of absolute differences.

```text
FUNCTION minMoves2(nums):
    // Sort the array to find the median
    SORT nums
    median ← nums[LEN(nums) / 2]
    // Compute total moves as sum of absolute differences to median
    total ← 0
    FOR num IN nums:
        total ← total + ABS(num - median)
    RETURN total
```

## Examples

| nums | Minimum Moves |
|------|---------------|
| [1,2,3] | 2 |
| [1,10,2,9] | 16 |
| [1,0,0,8,6] | 14 |

*Explanation*: For `[1,2,3]` the median is `2`. Moves = `|1-2| + |2-2| + |3-2| = 2`.

## Walkthrough

Consider the array `[1,10,2,9]`.

1. Sort → `[1,2,9,10]`
2. Median (n/2) → `9` (or `2` for even length, both give same total moves)
3. Compute moves:
   - `|1-9| = 8`
   - `|2-9| = 7`
   - `|9-9| = 0`
   - `|10-9| = 1`
4. Total = `8+7+0+1 = 16`.

## Complexity Analysis

- **Time:** O(n log n) due to sorting (can be O(n) with quickselect).
- **Space:** O(1) extra space if sorting in‑place.

## Follow‑Up Questions

- How would you achieve O(n) time without full sorting?
- What if each move could increase or decrease an element by `k` instead of `1`?
- How does the solution change for a circular array where moves wrap around?

## Key Takeaway

> The median minimizes `Σ|x - target|` — fundamental property for equalization with increment/decrement operations.
