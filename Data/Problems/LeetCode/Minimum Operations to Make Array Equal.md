# 1551. Minimum Operations to Make Array Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-equal](https://leetcode.com/problems/minimum-operations-to-make-array-equal)
**Companies:** Amazon, Brillio

---

## Problem Description
You have an array `arr` of length `n` where `arr[i] = (2 * i) + 1` for all valid values of `i` (i.e., `0 <= i < n`).

In one operation, you can select two indices `x` and `y` where `0 <= x, y < n` and subtract `1` from `arr[x]` and add `1` to `arr[y]` (i.e., perform `arr[x] -= 1` and `arr[y] += 1`). The goal is to make all the elements of the array **equal**. It is **guaranteed** that all the elements of the array can be made equal using some operations.

Given an integer `n`, the length of the array, return *the minimum number of operations* needed to make all the elements of arr equal.

**Constraints:**
- `1 <= n <= 10^4`

## Examples

```
Example 1:
  Input: n = 3
  Output: 2
  Explanation: arr = [1, 3, 5]
  First operation choose x = 2 and y = 0, this leads arr to be [2, 3, 4]
  In the second operation choose x = 2 and y = 0 again, thus arr = [3, 3, 3].
```

```
Example 2:
  Input: n = 6
  Output: 9
```

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
