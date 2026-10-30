# 2905. Find Indices With Index and Value Difference II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-indices-with-index-and-value-difference-ii](https://leetcode.com/problems/find-indices-with-index-and-value-difference-ii)
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

- `1 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= indexDifference <= 10^5`
- `0 <= valueDifference <= 10^9`

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
Use a hash map to store the earliest index for each value of `i - nums[i]`. While scanning, compute the current key and, if it exists, update the answer with `i - earliestIndex[key]`. This yields O(n) time.

## Walkthrough
| i | nums[i] | key = i - nums[i] | earliest index for key | distance | max distance |
|---|---------|------------------|------------------------|----------|--------------|
| 0 | 1       | -1               | 0 (store)              | –        | 0 |
| 1 | 2       | -1               | 0                      | 1-0=1    | 1 |
| 2 | 3       | -1               | 0                      | 2-0=2    | 2 |
| 3 | 4       | -1               | 0                      | 3-0=3    | 3 |
| 4 | 5       | -1               | 0                      | 4-0=4    | 4 |

## Complexity Analysis
- **Time:** O(n) where *n* is the length of `nums`.
- **Space:** O(n) for the hash map storing at most one entry per distinct key.

## Follow-Up Questions
1. How would you adapt the solution if the condition were `i + nums[i] == j + nums[j]`?
2. Can the problem be solved in a single pass without extra space using two‑pointer technique?
3. What if you need to return the actual pair of indices instead of just the distance?

## Key Takeaway
Storing the first occurrence of each `i - nums[i]` value in a hash map lets you compute the maximum index distance in linear time.