# 494. Target Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/target-sum](https://leetcode.com/problems/target-sum)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Myntra, Nuro, Pinterest, Salesforce, Servicenow, Zoho

---

## 1. Problem Description

Given an array `nums` and a `target`, assign `+` or `-` to each element to make the sum equal to `target`. Return the number of ways.

---

## 2. Approach: DP (Subset Sum) — O(n·sum) ✅

Transform: if P = sum of positives, N = sum of negatives: `P - N = target` and `P + N = total`. So `P = (target + total) / 2`. Count subsets summing to P.

```
FUNCTION findTargetSumWays(nums, target):
    total = SUM(nums)
    IF (target + total) % 2 != 0 OR ABS(target) > total:
        RETURN 0

    subsetSum = (target + total) / 2
    dp = array of (subsetSum + 1) zeros
    dp[0] = 1

    FOR num IN nums:
        FOR j ← subsetSum DOWN TO num:
            dp[j] += dp[j - num]

    RETURN dp[subsetSum]
```

| Time | Space |
|------|-------|
| O(n · sum) | O(sum) |

---

## Key Takeaway

> Transform the +/- assignment into a subset sum problem. `P = (target + total) / 2` reduces to counting subsets with a given sum — standard 0/1 knapsack.
