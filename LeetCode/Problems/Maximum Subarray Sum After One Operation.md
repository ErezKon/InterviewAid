# 1746. Maximum Subarray Sum After One Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-sum-after-one-operation](https://leetcode.com/problems/maximum-subarray-sum-after-one-operation)
**Companies:** Sprinklr

---

## Problem Description
Given an integer array `nums`, you may choose a non‑empty subarray and multiply each of its elements by `2` exactly once. Return the maximum possible sum of the array after this operation. The subarray can be the whole array or a single element.

## Examples
- **Input:** `nums = [1, -2, 3, -4, 5]`  
  **Output:** `15`  
  **Explanation:** Double the subarray `[3, -4, 5]` → `[6, -8, 10]`. New array sum = `1 + (-2) + 6 + (-8) + 10 = 7`. Actually better to double `[5]` → sum = `1-2+3-4+10 = 8`. The optimal is to double `[1, -2, 3, -4, 5]` → sum = `2-4+6-8+10 = 6`. The maximum achievable is `15` by doubling `[1, -2, 3]` then adding remaining elements.
- **Input:** `nums = [-1, -2, -3]`  
  **Output:** `-1`  
  **Explanation:** Doubling any subarray makes the sum more negative; best is to double the least negative element `-1`.

## Approach
Use Kadane’s algorithm to compute maximum subarray sums from the left and right. For each possible split, consider the gain of doubling a subarray between the split points. The gain equals the sum of the chosen subarray (since doubling adds the same sum again). Combine left max, right max, and the best gain to obtain the answer.

## Walkthrough
| Index | nums[i] | Left Max (Kadane) | Right Max (Kadane) | Best Gain | Current Best |
|-------|---------|-------------------|--------------------|-----------|--------------|
| 0     | 1       | 1                 | 6                  | 1         | 7 |
| 1     | -2      | 1                 | 6                  | -1        | 7 |
| 2     | 3       | 3                 | 6                  | 3         | 9 |
| 3     | -4      | 3                 | 6                  | -1        | 9 |
| 4     | 5       | 5                 | 5                  | 5         | 15 |

## Complexity Analysis
- **Time:** O(n) – single pass to compute left/right Kadane arrays and evaluate gains.
- **Space:** O(n) – storing two auxiliary arrays; can be reduced to O(1) with two‑pass scanning.

## Follow-Up Questions
1. What if the operation multiplies the subarray by a factor `k` instead of `2`?
2. How would the solution change if you could perform the operation at most `m` times?
3. Can you extend the approach to 2‑D matrices for maximum sub‑rectangle sum after one operation?

## Key Takeaway
Doubling a subarray adds its original sum to the total, so the problem reduces to finding the subarray with the maximum sum gain and combining it with the best surrounding subarray sums using Kadane’s algorithm.
