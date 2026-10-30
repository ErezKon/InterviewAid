# 462. Minimum Moves to Equal Array Elements II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii)
**Companies:** Amazon, Google, Microsoft, Myntra, Tcs

---

## Problem Description

Given an integer array `nums` of size `n`, return *the minimum number of moves required to make all array elements equal*.

In one move, you can increment or decrement an element of the array by `1`.

Test cases are designed so that the answer will fit in a **32-bit** integer.

**Constraints:**
- `n == nums.length`
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

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

**Example 1:**
```
Input: nums = [1,2,3]
Output: 2
Explanation: Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
```

**Example 2:**
```
Input: nums = [1,10,2,9]
Output: 16
```

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
