# 1551. Minimum Operations to Make Array Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-equal](https://leetcode.com/problems/minimum-operations-to-make-array-equal)
**Companies:** Amazon, Brillio

---

## Problem Description
Given an integer array `nums`, you may perform the following operation any number of times: choose two distinct indices `i` and `j`, increment `nums[i]` by `2` and decrement `nums[j]` by `1`. Return the minimum number of operations required to make all elements of the array equal.

## Examples
**Example 1:**
Input: `nums = [2,5,6]`
Output: `3`
Explanation: One optimal sequence is: \( [2,5,6] → [4,4,6] → [6,4,4] → [6,6,6] \).

**Example 2:**
Input: `nums = [3,3,3]`
Output: `0`
Explanation: The array is already equal.

## Approach
The operation increases the total sum by `1`. To make all elements equal to a target `t`, the total sum must become `n * t`. The smallest feasible `t` is the ceiling of the average of the array. The required number of operations equals `t * n - sum(nums)`.

```text
FUNCTION minOperations(nums):
    SET n ← LENGTH(nums)
    SET total ← SUM of nums
    SET target ← CEIL(total / n)
    RETURN target * n - total
```

## Walkthrough
| Step | Array | Total Sum | Target | Operations |
|------|-------|-----------|--------|------------|
| Start | [2,5,6] | 13 | ceil(13/3)=5 | 0 |
| After ops | [6,6,6] | 18 | 6 | 3 |

## Complexity Analysis
Time: **O(n)** – one pass to compute the sum.
Space: **O(1)** – constant extra space.

## Follow-Up Questions
1. How would the solution change if the operation allowed adding `k` to one element and subtracting `1` from another?
2. Can you handle negative numbers in the array?
3. What if the operation costs differ for increment and decrement?

## Key Takeaway
The minimal equal value is the ceiling of the average, and each operation raises the total sum by exactly one, so the answer is the gap between the target total and the current total.
