# 3736. Minimum Moves to Equal Array Elements III

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii)
**Companies:** Adobe

---

## Problem Description

Given an array, in one move you can increment or decrement any element by 1. Return the **minimum moves** to make all elements equal.

## Key Insight

> Same as "Min Moves II" (#462) — the optimal target is the **median**. Sum of absolute deviations from the median is minimized.

## Approach

Sort the array to locate the median, then sum absolute differences to that median.

```text
FUNCTION minMoves(nums):
    // Sort to find median
    SORT nums
    median ← nums[LEN(nums) / 2]
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
| [0,0,0] | 0 |

## Walkthrough

Take `[1,10,2,9]`:
1. Sort → `[1,2,9,10]`
2. Median (n/2) → `9` (or `2` for even length, both give same total)
3. Compute moves:
   - `|1-9| = 8`
   - `|2-9| = 7`
   - `|9-9| = 0`
   - `|10-9| = 1`
4. Total moves = `8+7+0+1 = 16`.

## Complexity Analysis

- **Time:** O(n log n) due to sorting (can be O(n) with quickselect).
- **Space:** O(1) extra space if sorting in‑place.

## Follow‑Up Questions

- How to achieve O(n) time without full sorting?
- What changes if each move can adjust an element by `k` instead of `1`?
- How to handle circular arrays where moves wrap around?

## Key Takeaway

> The median minimizes `Σ|x - target|` — a core insight for equalization problems.
