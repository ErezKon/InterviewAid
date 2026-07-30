# 377. Combination Sum IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-iv](https://leetcode.com/problems/combination-sum-iv)
**Companies:** Amazon, Bloomberg, Google, Meta, Snapchat, Tiktok

---

## Problem Description
Given an integer array `nums` of distinct positive numbers and a target integer `target`, return the number of possible **ordered** combinations that add up to `target`. You may use each number in `nums` an unlimited number of times. The answer may be large; return it modulo 10⁹ + 7 if required.

## Examples
**Example 1**
```
Input: nums = [1,2,3], target = 4
Output: 7
Explanation: The possible sequences are:
[1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2], [1,3], [3,1]
```
**Example 2**
```
Input: nums = [9], target = 3
Output: 0
Explanation: No combination can sum to 3.
```

## Approach
Use dynamic programming where `dp[i]` stores the number of ordered combinations that sum to `i`. Iterate `i` from 1 to `target` and for each `num` in `nums` add `dp[i‑num]` to `dp[i]` when `i ≥ num`.

### Pseudocode
```text
FUNCTION combinationSum4(nums, target):
    dp ← ARRAY of size target + 1 FILLED WITH 0
    dp[0] ← 1  // empty combination
    FOR i ← 1 TO target:
        FOR num IN nums:
            IF i ≥ num:
                dp[i] ← dp[i] + dp[i - num]
    RETURN dp[target]
```

## Walkthrough
Consider `nums = [1,2,3]`, `target = 4`.
| i | dp[i] computation | dp[i] value |
|---|-------------------|------------|
|1| dp[1] += dp[0] (num=1) |1|
|2| dp[2] += dp[1] (num=1) →1; dp[2] += dp[0] (num=2) →2|2|
|3| dp[3] += dp[2] (1) →2; dp[3] += dp[1] (2) →3; dp[3] += dp[0] (3) →4|4|
|4| dp[4] += dp[3] (1) →4; dp[4] += dp[2] (2) →6; dp[4] += dp[1] (3) →7|7|

## Complexity Analysis
- **Time:** O(target × n) where n = length of `nums`.
- **Space:** O(target) for the DP array.

## Follow-Up Questions
1. How would you handle the case where the answer must be returned modulo a large prime?
2. Can you optimize the solution for very large `target` using combinatorial mathematics?
3. How does the problem change if order does **not** matter (i.e., combinations instead of permutations)?

## Key Takeaway
Treating the problem as counting ordered sequences allows a simple DP where each state builds on smaller targets.
