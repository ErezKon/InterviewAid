# 1502. Can Make Arithmetic Progression From Sequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence](https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
A sequence of numbers is called an **arithmetic progression** if the difference between any two consecutive elements is the same.

Given an array of numbers `arr`, return `true` *if the array can be rearranged to form an **arithmetic progression**. Otherwise, return* `false`.

**Constraints:**
- `2 <= arr.length <= 1000`
- `-10^6 <= arr[i] <= 10^6`

## Examples
```
Example 1:
  Input: arr = [3,5,1]
  Output: true
  Explanation: We can reorder the elements as [1,3,5] or [5,3,1] with differences 2 and -2 respectively, between each consecutive elements.
```

```
Example 2:
  Input: arr = [1,2,4]
  Output: false
  Explanation: There is no way to reorder the elements to obtain an arithmetic progression.
```

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
