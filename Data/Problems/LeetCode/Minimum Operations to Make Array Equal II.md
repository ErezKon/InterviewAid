# 2541. Minimum Operations to Make Array Equal II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-equal-ii](https://leetcode.com/problems/minimum-operations-to-make-array-equal-ii)
**Companies:** Walmart Labs

---

## Problem Description
You are given two integer arrays `nums1` and `nums2` of equal length `n` and an integer `k`. You can perform the following operation on `nums1`:

- Choose two indexes `i` and `j` and increment `nums1[i]` by `k` and decrement `nums1[j]` by `k`. In other words, `nums1[i] = nums1[i] + k` and `nums1[j] = nums1[j] - k`.

`nums1` is said to be **equal** to `nums2` if for all indices `i` such that `0 <= i < n`, `nums1[i] == nums2[i]`.

Return *the **minimum** number of operations required to make* `nums1` *equal to* `nums2`. If it is impossible to make them equal, return `-1`.

**Constraints:**
- `n == nums1.length == nums2.length`
- `2 <= n <= 10^5`
- `0 <= nums1[i], nums2[j] <= 10^9`
- `0 <= k <= 10^5`

## Examples

```
Example 1:
  Input: nums1 = [4,3,1,4], nums2 = [1,3,7,1], k = 3
  Output: 2
  Explanation: In 2 operations, we can transform nums1 to nums2.
  1st operation: i = 2, j = 0. After applying the operation, nums1 = [1,3,4,4].
  2nd operation: i = 2, j = 3. After applying the operation, nums1 = [1,3,7,1].
  One can prove that it is impossible to make arrays equal in fewer operations.
```

```
Example 2:
  Input: nums1 = [3,8,5,2], nums2 = [2,4,1,6], k = 1
  Output: -1
  Explanation: It can be proved that it is impossible to make the two arrays equal.
```

## Approach
The operation increases the total sum by `1` ( +2 and -1 ). To make all elements equal to a target `t`, the total sum must become `n * t`. The minimal `t` is the ceiling of the average of the array. The number of operations equals `t * n - sum(nums)`. This follows a greedy insight that we always push the array toward the smallest feasible equal value.

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
2. Can you extend the approach to handle negative numbers?
3. What if the operation cost differs for increment and decrement?

## Key Takeaway
The minimal equal value is the ceiling of the average, and each operation increases the total sum by exactly one, so the answer is simply the gap between the target total and the current total.
