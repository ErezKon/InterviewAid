# 2915. Length of the Longest Subsequence That Sums to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target](https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target)
**Companies:** Amazon, Intuit, Meta

---

## 1. Problem Description

You are given a **0-indexed** array of integers `nums`, and an integer `target`.

Return *the **length of the longest subsequence** of* `nums` *that sums up to* `target`. *If no such subsequence exists, return* `-1`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- `1 <= target <= 1000`

---

## 2. Approach: DP (0/1 Knapsack variant) — O(n·target) ✅

```text
FUNCTION lengthOfLongestSubsequence(nums, target):
    // dp[j] = maximum length of subsequence that sums to j
    SET dp ← array of size target+1 filled with -infinity
    SET dp[0] ← 0
    FOR num IN nums:
        FOR j ← target DOWN TO num:
            SET dp[j] ← MAX(dp[j], dp[j - num] + 1)
    RETURN dp[target] IF dp[target] > 0 ELSE -1
```

---

## Examples

```
Example 1:
  Input: nums = [1,2,3,4,5], target = 9
  Output: 3
  Explanation: There are 3 subsequences with a sum equal to 9: [4,5], [1,3,5], and [2,3,4].
  The longest subsequences are [1,3,5], and [2,3,4]. Hence, the answer is 3.
```

```
Example 2:
  Input: nums = [4,1,3,2,1,5], target = 7
  Output: 4
  Explanation: There are 5 subsequences with a sum equal to 7: [4,3], [4,1,2], [4,2,1], [1,1,5], and [1,3,2,1].
  The longest subsequence is [1,3,2,1]. Hence, the answer is 4.
```

```
Example 3:
  Input: nums = [1,1,5,4,5], target = 3
  Output: -1
  Explanation: It can be shown that nums has no subsequence that sums up to 3.
```

---

## Walkthrough

Take `nums = [1,2,3,4,5]`, `target = 9`.

1. Initialize `dp[0]=0`, others = -∞.
2. Process `num=1`:
   - Update `dp[1]=1`.
3. Process `num=2`:
   - Update `dp[3]=dp[1]+1=2`, `dp[2]=1`.
4. Process `num=3`:
   - Update `dp[6]=dp[3]+1=3`, `dp[5]=dp[2]+1=2`, `dp[4]=dp[1]+1=2`.
5. Process `num=4` and `num=5` similarly.
6. Final `dp[9]=3`, representing a subsequence of length 3.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n·target) | O(target) |

The DP iterates over each number and each possible sum up to `target`.

---

## Follow-Up Questions

1. How would you modify the solution to return the actual subsequence, not just its length?
2. Can the algorithm be optimized for large `target` using meet-in-the-middle?
3. What changes are needed if numbers can be negative?

---

## Key Takeaway

> Classic 0/1 knapsack variant where `dp[j]` stores the maximum count of elements summing to `j`. Iterate numbers outer, sums inner (descending) to enforce each element is used at most once.
