# 2903. Find Indices With Index and Value Difference I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-indices-with-index-and-value-difference-i](https://leetcode.com/problems/find-indices-with-index-and-value-difference-i)
**Companies:** Paytm

---

## Problem Description
You are given a **0-indexed** integer array `nums` having length `n`, an integer `indexDifference`, and an integer `valueDifference`.

Your task is to find **two** indices `i` and `j`, both in the range `[0, n - 1]`, that satisfy the following conditions:

- `abs(i - j) >= indexDifference`, and
- `abs(nums[i] - nums[j]) >= valueDifference`

Return *an integer array* `answer`, *where* `answer = [i, j]` *if there are two such indices*, *and* `answer = [-1, -1]` *otherwise*. If there are multiple choices for the two indices, return *any of them*.

**Note:** `i` and `j` may be **equal**.

**Constraints:**

- `1 <= n == nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= indexDifference <= 100`
- `0 <= valueDifference <= 50`

## Examples

```
Example 1:
  Input: nums = [5,1,4,1], indexDifference = 2, valueDifference = 4
  Output: [0,3]
  Explanation: In this example, i = 0 and j = 3 can be selected.
  abs(0 - 3) >= 2 and abs(nums[0] - nums[3]) >= 4.
  Hence, a valid answer is [0,3].
  [3,0] is also a valid answer.
```

```
Example 2:
  Input: nums = [2,1], indexDifference = 0, valueDifference = 0
  Output: [0,0]
  Explanation: In this example, i = 0 and j = 0 can be selected.
  abs(0 - 0) >= 0 and abs(nums[0] - nums[0]) >= 0.
  Hence, a valid answer is [0,0].
  Other valid answers are [0,1], [1,0], and [1,1].
```

```
Example 3:
  Input: nums = [1,2,3], indexDifference = 2, valueDifference = 4
  Output: [-1,-1]
  Explanation: In this example, it can be shown that it is impossible to find two indices that satisfy both conditions.
  Hence, [-1,-1] is returned.
```

## Approach
Iterate through the array while checking the condition `i - nums[i] == target`. Because each index is examined once, the algorithm runs in linear time.

## Walkthrough
| i | nums[i] | i - nums[i] | Condition met? |
|---|---------|-------------|----------------|
| 0 | 0       | 0           | Yes (target=0) |
| 1 | 1       | 0           | No |
| 2 | 2       | 0           | No |
| 3 | 3       | 0           | No |
The first matching index `0` is returned.

## Complexity Analysis
- **Time:** O(n) where *n* is the length of `nums`.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you modify the solution to return **all** matching indices?
2. Can the problem be solved using a hash map for faster look‑ups when the condition is `i + nums[i] == target`?
3. What if the array is sorted—does it enable a binary‑search approach?

## Key Takeaway
A simple linear scan suffices: checking `i - nums[i]` against the target for each index yields an O(n) time, O(1) space solution.