# 2915. Length of the Longest Subsequence That Sums to Target

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Intuit, Meta

---

## 1. Problem Description

Find the length of the longest subsequence that sums to `target`. Return -1 if impossible.

---

## 2. Approach: DP (0/1 Knapsack variant) — O(n·target) ✅

```
FUNCTION lengthOfLongestSubsequence(nums, target):
    dp = [-infinity] * (target + 1); dp[0] = 0
    FOR num IN nums:
        FOR j ← target DOWN TO num:
            dp[j] = MAX(dp[j], dp[j - num] + 1)
    RETURN dp[target] IF dp[target] > 0 ELSE -1
```

| Time | Space |
|------|-------|
| O(n · target) | O(target) |

---

## 3. Key Takeaway

> Classic 0/1 knapsack maximizing count instead of value. `dp[j]` = max elements summing to `j`. Iterate nums outer, sums inner (descending for 0/1).
