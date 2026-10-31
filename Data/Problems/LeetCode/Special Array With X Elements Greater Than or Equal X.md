# 1608. Special Array With X Elements Greater Than or Equal X

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
You are given an array `nums` of non-negative integers. `nums` is considered **special** if there exists a number `x` such that there are **exactly** `x` numbers in `nums` that are **greater than or equal to** `x`.

Notice that `x` **does not** have to be an element in `nums`.

Return `x` *if the array is **special**, otherwise, return* `-1`. It can be proven that if `nums` is special, the value for `x` is **unique**.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## Examples
```
Example 1:
  Input: nums = [3,5]
  Output: 2
  Explanation: There are 2 values (3 and 5) that are greater than or equal to 2.
```

```
Example 2:
  Input: nums = [0,0]
  Output: -1
  Explanation: No numbers fit the criteria for x.
    If x = 0, there should be 0 numbers >= x, but there are 2.
    If x = 1, there should be 1 number >= x, but there are 0.
    If x = 2, there should be 2 numbers >= x, but there are 0.
    x cannot be greater since there are only 2 numbers in nums.
```

```
Example 3:
  Input: nums = [0,4,3,0,4]
  Output: 3
  Explanation: There are 3 values that are greater than or equal to 3.
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
- Space: `O(1)` extra beyond the input array (in-place sort).

## Follow-Up Questions
1. How would you solve the problem in `O(n)` time without sorting?
2. Can you adapt the algorithm to return all possible `x` values if multiple exist?
3. How does the solution change if the array may contain negative numbers?

## Key Takeaway
Sorting enables binary search to efficiently count elements ≥ x, allowing a linear scan over possible `x` values to find the special array condition.
