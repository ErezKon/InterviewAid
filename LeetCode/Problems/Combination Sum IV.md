# 377. Combination Sum IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-iv](https://leetcode.com/problems/combination-sum-iv)
**Companies:** Amazon, Bloomberg, Google, Meta, Snapchat, Tiktok

---

## Approach: DP — O(n·target) ✅

```
FUNCTION combinationSum4(nums, target):
    dp = [0] * (target + 1)
    dp[0] = 1

    FOR i ← 1 TO target:
        FOR num IN nums:
            IF i >= num:
                dp[i] += dp[i - num]

    RETURN dp[target]
```

Order matters (permutations not combinations). Outer loop on target, inner on nums.
