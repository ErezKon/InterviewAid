# 3796. Find Maximum Value in a Constrained Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-value-in-a-constrained-sequence](https://leetcode.com/problems/find-maximum-value-in-a-constrained-sequence)
**Companies:** Amazon, Samsung

---

## Problem Description
You are given an integer `n`, a 2D integer array `restrictions`, and an integer array `diff` of length `n - 1`. Your task is to construct a sequence of length `n`, denoted by `a[0], a[1], ..., a[n - 1]`, such that it satisfies the following conditions:

- `a[0]` is 0.
- All elements in the sequence are **non-negative**.
- For every index `i` (`0 <= i <= n - 2`), `abs(a[i] - a[i + 1]) <= diff[i]`.
- For each `restrictions[i] = [idx, maxVal]`, the value at position `idx` in the sequence must not exceed `maxVal` (i.e., `a[idx] <= maxVal`).

Your goal is to construct a valid sequence that **maximizes** the **largest** value within the sequence while satisfying all the above conditions.

Return an integer denoting the **largest** value present in such an optimal sequence.

> *Note: the Approach / Walkthrough below solve a different (sliding-window subsequence sum) problem. Correct approach: set `cap[i] = maxVal` (or ∞; `cap[0] = 0`), then do a left-to-right pass `cap[i] = min(cap[i], cap[i-1] + diff[i-1])` and a right-to-left pass `cap[i] = min(cap[i], cap[i+1] + diff[i])`; the answer is `max(cap)`. O(n).*

## Examples
**Example 1:**
```
Input: n = 10, restrictions = [[3,1],[8,1]], diff = [2,2,3,1,4,5,1,1,2]
Output: 6
Explanation: The sequence a = [0, 2, 4, 1, 2, 6, 2, 1, 1, 3] satisfies the given constraints (a[3] <= 1 and a[8] <= 1). The maximum value in the sequence is 6.
```
**Example 2:**
```
Input: n = 8, restrictions = [[3,2]], diff = [3,5,2,4,2,3,1]
Output: 12
Explanation: The sequence a = [0, 3, 3, 2, 6, 8, 11, 12] satisfies the given constraints (a[3] <= 2). The maximum value in the sequence is 12.
```

## Constraints
- `2 <= n <= 10^5`
- `1 <= restrictions.length <= n - 1`
- `restrictions[i].length == 2`
- `restrictions[i] = [idx, maxVal]`
- `1 <= idx < n`
- `1 <= maxVal <= 10^6`
- `diff.length == n - 1`
- `1 <= diff[i] <= 10`
- The values of `restrictions[i][0]` are unique.

## Approach
Use **dynamic programming** where `dp[i]` stores the best value of a valid subsequence ending at index `i`. For each `i`, look back only at indices that satisfy the constraint (e.g., `i - j ≤ limit`). The transition is:
`dp[i] = nums[i] + max(dp[j])` for all valid `j`. To speed up the max lookup, maintain a **monotonic deque** that holds candidate `dp` values within the sliding window of allowed indices.

### Pseudocode
```text
FUNCTION maxConstrainedValue(nums, limit):
    n ← LENGTH(nums)
    dp ← ARRAY of size n filled with 0
    deque ← EMPTY DEQUE  // stores pairs (index, dp value) in decreasing dp order
    FOR i ← 0 TO n-1:
        // Remove out‑of‑range indices from front
        WHILE deque NOT EMPTY AND deque[0].index < i - limit:
            POP_FRONT(deque)
        // Best previous value is at front of deque, if any
        bestPrev ← 0
        IF deque NOT EMPTY:
            bestPrev ← deque[0].value
        dp[i] ← nums[i] + bestPrev
        // Insert current dp while keeping deque decreasing
        WHILE deque NOT EMPTY AND deque[-1].value ≤ dp[i]:
            POP_BACK(deque)
        PUSH_BACK(deque, (i, dp[i]))
    RETURN MAX(dp)
```

## Walkthrough
Take `nums = [1,5,2,4,6]`, `limit = 2`.
| i | nums[i] | deque before | bestPrev | dp[i] | deque after |
|---|---------|--------------|----------|------|------------|
|0|1|[]|0|1|[(0,1)]|
|1|5|[(0,1)]|1|6|[(1,6)]|
|2|2|[(1,6)]|6|8|[(1,6),(2,8)] → pop back to keep decreasing → [(2,8)]|
|3|4|[(2,8)]|8|12|[(3,12)]|
|4|6|[(3,12)]|12|18|[(4,18)]|
Maximum dp = 18, corresponding to subsequence `[5,4,6]`.

## Complexity Analysis
*Time*: O(n) – each element enters and leaves the deque at most once.
*Space*: O(n) for `dp` and O(limit) ≤ O(n) for the deque.

## Follow‑Up Questions
1. How would the solution change if the constraint is based on value differences instead of index distance?
2. Can we extend the approach to handle multiple simultaneous constraints?
3. What modifications are needed to also output the actual subsequence achieving the maximum value?

## Key Takeaway
A sliding‑window DP with a monotonic deque lets us compute the best constrained subsequence in linear time by efficiently tracking the maximum previous DP value within the allowed range.
