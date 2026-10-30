# 3685. Subsequence Sum After Capping Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subsequence-sum-after-capping-elements](https://leetcode.com/problems/subsequence-sum-after-capping-elements)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "maximum capped sum" problem. Correct idea: sort `nums`; sweep `x = 1..n`, adding every value `≤ x` to a 0/1-knapsack bitset of reachable sums (`≤ k`); with `c` values still `> x` (each acts as a copy of `x`), `answer[x-1]` is true iff some `j ∈ [0, c]` has `k − j·x` reachable. O(n·k/w + Σ c).*

You are given an integer array `nums` of size `n` and a positive integer `k`.

An array **capped** by value `x` is obtained by replacing every element `nums[i]` with `min(nums[i], x)`.

For each integer `x` from 1 to `n`, determine whether it is possible to choose a **subsequence** from the array capped by `x` such that the sum of the chosen elements is **exactly** `k`.

Return a **0-indexed** boolean array `answer` of size `n`, where `answer[i]` is `true` if it is possible when using `x = i + 1`, and `false` otherwise.

**Constraints:**
- `1 <= n == nums.length <= 4000`
- `1 <= nums[i] <= n`
- `1 <= k <= 4000`

## Examples

**Example 1:**
```
Input: nums = [4,3,2,4], k = 5
Output: [false,false,true,true]
Explanation:
- For x = 1, the capped array is [1, 1, 1, 1]. Possible sums are 1, 2, 3, 4, so it is impossible to form a sum of 5.
- For x = 2, the capped array is [2, 2, 2, 2]. Possible sums are 2, 4, 6, 8, so it is impossible to form a sum of 5.
- For x = 3, the capped array is [3, 3, 2, 3]. A subsequence [2, 3] sums to 5, so it is possible.
- For x = 4, the capped array is [4, 3, 2, 4]. A subsequence [3, 2] sums to 5, so it is possible.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5], k = 3
Output: [true,true,true,true,true]
Explanation: For every value of x, it is always possible to select a subsequence from the capped array that sums exactly to 3.
```

## Approach
Sort the array in descending order. While iterating, replace each element larger than `k` with `k` and accumulate the sum. Since capping larger values never decreases the sum, the greedy choice of capping every element above `k` yields the maximum.

```text
FUNCTION MaxCappedSubsequenceSum(nums, k):
    SET total ← 0
    FOR value IN nums:
        IF value > k:
            SET total ← total + k
        ELSE:
            SET total ← total + value
    RETURN total
```

## Walkthrough
| Step | Original Value | Capped Value | Running Total |
|------|----------------|--------------|---------------|
| 1 | 1 | 1 | 1 |
| 2 | 3 | 3 | 4 |
| 3 | 5 | 3 (k) | 7 |
| 4 | 2 | 2 | 9 |

## Complexity Analysis
- **Time:** O(n) – one pass through the array.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
- How would the solution change if you could cap at *different* values for each element?
- Can you extend the approach to handle a stream of numbers where `k` may vary over time?
- What if you were required to return the actual subsequence achieving the maximum sum?

## Key Takeaway
Capping every element that exceeds the limit `k` and summing yields the optimal subsequence sum, achievable with a simple linear scan.
