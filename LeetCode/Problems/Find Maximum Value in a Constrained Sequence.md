# 3796. Find Maximum Value in a Constrained Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-value-in-a-constrained-sequence](https://leetcode.com/problems/find-maximum-value-in-a-constrained-sequence)
**Companies:** Amazon, Samsung

---

## Problem Description
Given an integer array `nums` and a set of constraints that limit which previous elements can be used to extend a subsequence, compute the maximum possible value of a subsequence that satisfies all constraints. Constraints are typically expressed as a maximum allowed index distance or a value bound between consecutive elements.

## Examples
**Example 1**
```
nums = [1, 5, 2, 4, 6]
Constraint: each chosen element must be within 2 positions of the previous one.
Maximum value = 15  // subsequence [5,4,6]
```
**Example 2**
```
nums = [3, 1, 2, 7, 5]
Constraint: next element must be greater than previous.
Maximum value = 12  // subsequence [3,2,7]
```

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
