# 2919. Minimum Increment Operations to Make Array Beautiful

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful](https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful)
**Companies:** Google

---

## Problem Description

An array is **beautiful** if for every consecutive three elements, at least one element is greater than or equal to a given integer `k`. In one operation you may increment any element by `1`. Return the minimum total number of increments required to make the array beautiful.

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4], k = 3
Output: 0
Explanation: The array already satisfies the condition because each window of three consecutive elements contains at least one element ≥ 3.
```

**Example 2:**
```
Input: nums = [0,0,0,0], k = 5
Output: 15
Explanation: Increment the first three elements to 5 (cost 5+5+5) and the last element can stay 0 because the window [0,5,5] already has an element ≥5.
```

## Approach

**Algorithm:** Dynamic Programming with a sliding window of size 3.

The key insight is that the distance between two elements that are incremented to reach `k` cannot exceed two positions; otherwise a window of three would lack a qualified element. We maintain `dp[i]` as the minimum cost to make the prefix up to index `i` beautiful when `nums[i]` is the last element raised to at least `k`. For each position we consider the three possible previous bump positions.

```text
FUNCTION minIncrementOperations(nums, k):
    n ← LENGTH(nums)
    dp ← ARRAY of size n
    FOR i ← 0 TO n-1:
        cost_i ← MAX(0, k - nums[i])
        IF i < 3:
            dp[i] ← cost_i
        ELSE:
            dp[i] ← cost_i + MIN(dp[i-1], dp[i-2], dp[i-3])
    RETURN MIN(dp[n-1], dp[n-2], dp[n-3])
```

## Walkthrough

Consider `nums = [0,0,0,0]` and `k = 5`.
| i | nums[i] | cost_i | dp[i] calculation | dp[i] |
|---|---------|--------|-------------------|-------|
|0|0|5|i<3 → dp[0]=5|5|
|1|0|5|i<3 → dp[1]=5|5|
|2|0|5|i<3 → dp[2]=5|5|
|3|0|5|dp[3]=5+MIN(dp[2],dp[1],dp[0])=5+5=10|10|
The answer is `MIN(dp[3],dp[2],dp[1]) = MIN(10,5,5) = 5`, meaning we only need to raise the first three elements to `5` (total 15 increments) and the last element can remain unchanged.

## Complexity Analysis

- **Time:** O(n) – each element is processed once.
- **Space:** O(n) for the `dp` array, which can be reduced to O(1) by keeping only the last three values.

## Follow-Up Questions

1. How would the solution change if the window size were `w` instead of `3`?
2. Can the problem be solved in-place without extra DP storage?
3. What if decrement operations were also allowed?

## Key Takeaway

"At least one in every window of three" translates to a DP where the gap between bumped elements is at most two, allowing a simple O(n) solution by tracking the minimum cost of the last three positions.