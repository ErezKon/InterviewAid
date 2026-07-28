# 1608. Special Array With X Elements Greater Than or Equal X

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given an integer array `nums`, find an integer `x` such that exactly `x` elements in `nums` are **greater than or equal to** `x`. If such an `x` exists, return it; otherwise return `-1`.

## Examples
**Example 1**
```
Input: nums = [3,5]
Output: 2
Explanation: There are exactly 2 elements (3 and 5) that are >= 2.
```

**Example 2**
```
Input: nums = [0,0]
Output: -1
Explanation: No integer x satisfies the condition.
```

## Approach
Sort the array. For each possible `x` from `0` to `n` (inclusive), the number of elements `>= x` equals `n - lower_bound(nums, x)`. If this count equals `x`, we have found the special array value.

```text
FUNCTION specialArray(nums):
    SORT nums ASCENDING
    SET n ← LENGTH(nums)
    FOR x ← 0 TO n:
        // lower_bound returns first index where value >= x
        SET idx ← LOWER_BOUND(nums, x)
        SET count ← n - idx
        IF count == x:
            RETURN x
    RETURN -1
```

## Walkthrough
| x | lower_bound index | count >= x | condition |
|---|-------------------|------------|-----------|
| 0 | 0 | 2 | 2 != 0 |
| 1 | 0 | 2 | 2 != 1 |
| 2 | 0 | 2 | 2 == 2 → return 2 |

## Complexity Analysis
- Time: `O(n log n)` for sorting plus `O(n log n)` for binary searches (overall `O(n log n)`).
- Space: `O(1)` extra beyond the input array (in‑place sort).

## Follow‑Up Questions
1. How would you solve the problem in `O(n)` time without sorting?
2. Can you adapt the algorithm to return all possible `x` values if multiple exist?
3. How does the solution change if the array may contain negative numbers?

## Key Takeaway
Sorting enables binary search to efficiently count elements ≥ x, allowing a linear scan over possible `x` values to find the special array condition.
