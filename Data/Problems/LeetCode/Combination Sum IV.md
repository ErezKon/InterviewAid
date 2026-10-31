# 377. Combination Sum IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-iv](https://leetcode.com/problems/combination-sum-iv)
**Companies:** Amazon, Bloomberg, Google, Meta, Snapchat, Tiktok

---

## Problem Description
Given an array of **distinct** integers `nums` and a target integer `target`, return *the number of possible combinations that add up to* `target`.

The test cases are generated so that the answer can fit in a **32-bit** integer.

**Constraints:**
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- All the elements of `nums` are **unique**.
- `1 <= target <= 1000`

**Follow up:** What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?

*(Note: unlike some counting problems, no modulo such as 10^9 + 7 is needed.)*

## Examples
```
Example 1:
  Input: nums = [1,2,3], target = 4
  Output: 7
  Explanation:
    The possible combination ways are:
    (1, 1, 1, 1)
    (1, 1, 2)
    (1, 2, 1)
    (1, 3)
    (2, 1, 1)
    (2, 2)
    (3, 1)
    Note that different sequences are counted as different combinations.
```
```
Example 2:
  Input: nums = [9], target = 3
  Output: 0
```

## Approach
Use dynamic programming where `dp[i]` stores the number of ordered combinations that sum to `i`. Iterate `i` from 1 to `target` and for each `num` in `nums` add `dp[i-num]` to `dp[i]` when `i ≥ num`.

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
- **Time:** O(target × n) where n = length of `nums`.
- **Space:** O(target) for the DP array.

## Follow-Up Questions
1. How would you handle the case where the answer must be returned modulo a large prime?
2. Can you optimize the solution for very large `target` using combinatorial mathematics?
3. How does the problem change if order does **not** matter (i.e., combinations instead of permutations)?

## Key Takeaway
Treating the problem as counting ordered sequences allows a simple DP where each state builds on smaller targets.
