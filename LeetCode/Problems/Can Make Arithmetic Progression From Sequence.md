# 1502. Can Make Arithmetic Progression From Sequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence](https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `arr`, determine whether the elements can be reordered such that they form an arithmetic progression (the difference between consecutive elements is constant).

## Examples
- Input: `arr = [3,5,1]`
  Output: `true`
  Explanation: Reordering to `[1,3,5]` yields a constant difference of 2.
- Input: `arr = [1,2,4]`
  Output: `false`
  Explanation: No ordering produces a constant difference.

## Approach: Sort + Check Difference — O(n log n) ✅

```text
FUNCTION canMakeArithmeticProgression(arr):
    // Sort the array to bring elements into order
    SORT arr
    diff ← arr[1] - arr[0]
    FOR i FROM 2 TO LENGTH(arr) - 1:
        IF arr[i] - arr[i-1] != diff:
            RETURN false
    RETURN true
```

## Walkthrough
| Step | Sorted Array | diff | Check |
|------|--------------|------|-------|
| 1 | `[1,3,5]` | 2 | 5-3 = 2 → matches |
| 2 | End of loop → return `true` |

## Complexity Analysis
- **Time:** O(n log n) for sorting; linear scan afterwards.
- **Space:** O(1) extra (in‑place sort) or O(n) if a copy is made.

## Follow‑Up Questions
1. How would you solve it in O(n) time without sorting?
2. Can you extend the solution to handle duplicate elements?
3. What if the progression must be strictly increasing vs. non‑decreasing?

## Key Takeaway
Sorting the array reduces the problem to a simple linear check of consecutive differences.
