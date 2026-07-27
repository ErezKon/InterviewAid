# 416. Partition Equal Subset Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 47.0%
**LeetCode:** [https://leetcode.com/problems/partition-equal-subset-sum](https://leetcode.com/problems/partition-equal-subset-sum)
**Companies:** Amazon, Bloomberg, Dream11, Ebay, Epam Systems, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Salesforce, Tcs, Tiktok, Visa, Walmart Labs, Zoho

---

## 1. Problem Description

Given an integer array `nums`, return `true` if you can partition it into two subsets with equal sum.

---

## 2. Approach: DP (0/1 Knapsack) — O(n·sum) ✅

```
FUNCTION canPartition(nums):
    total = SUM(nums)
    IF total is odd: RETURN false

    target = total / 2
    dp = boolean array of size (target + 1), all false
    dp[0] = true

    FOR num IN nums:
        FOR j ← target DOWN TO num:
            dp[j] = dp[j] OR dp[j - num]

    RETURN dp[target]
```

### Why iterate backwards?

To prevent using the same element twice. Iterating forward would allow `num` to be counted multiple times.

| Time | Space |
|------|-------|
| O(n · sum/2) | O(sum/2) |

---

## Key Takeaway

> Equal partition = find a subset summing to `total/2`. This is the classic 0/1 knapsack problem with boolean DP. Iterate target values in reverse to ensure each element is used at most once.
