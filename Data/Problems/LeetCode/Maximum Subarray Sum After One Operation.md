# 1746. Maximum Subarray Sum After One Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-sum-after-one-operation](https://leetcode.com/problems/maximum-subarray-sum-after-one-operation)
**Companies:** Sprinklr

---

## Problem Description

> *Note: the Approach below doubles a subarray. Officially exactly one element is **squared**. Correct idea: DP with `no[i] = max(no[i−1] + x, x)` and `sq[i] = max(sq[i−1] + x, no[i−1] + x², x²)`; the answer is `max(sq[i])`.*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums`. You must perform **exactly one** operation where you can **replace** one element `nums[i]` with `nums[i] * nums[i]`.

Return *the **maximum** possible subarray sum after **exactly one** operation*. The subarray must be non-empty.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Examples

**Example 1:**
```
Input: nums = [2,-1,-4,-3]
Output: 17
Explanation: You can perform the operation on index 2 (0-indexed) to make nums = [2,-1,16,-3]. Now, the maximum subarray sum is 2 + -1 + 16 = 17.
```

**Example 2:**
```
Input: nums = [1,-1,1,1,-1,-1,1]
Output: 4
Explanation: You can perform the operation on index 1 (0-indexed) to make nums = [1,1,1,1,-1,-1,1]. Now, the maximum subarray sum is 1 + 1 + 1 + 1 = 4.
```

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
- **Space:** O(n) – storing two auxiliary arrays; can be reduced to O(1) with two-pass scanning.

## Follow-Up Questions
1. What if the operation multiplies the subarray by a factor `k` instead of `2`?
2. How would the solution change if you could perform the operation at most `m` times?
3. Can you extend the approach to 2-D matrices for maximum sub-rectangle sum after one operation?

## Key Takeaway
Doubling a subarray adds its original sum to the total, so the problem reduces to finding the subarray with the maximum sum gain and combining it with the best surrounding subarray sums using Kadane’s algorithm.
