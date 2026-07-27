# 2518. Number of Great Partitions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-great-partitions](https://leetcode.com/problems/number-of-great-partitions)
**Companies:** Darwinbox, Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Complementary Counting + Knapsack — O(n · k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Partition array into two groups. A partition is "great" if both groups have sum ≥ `k`. Count great partitions mod 10⁹+7.

---

## 2. Key Insight

> Total partitions = 2ⁿ. Count "bad" partitions where at least one group has sum < k using knapsack DP. Answer = total - bad. A partition is bad if group1 sum < k OR group2 sum < k. If totalSum < 2k, answer is 0.

---

## 3. Approach: Complementary Counting + Knapsack — O(n · k) ✅

```
FUNCTION countPartitions(nums, k):
    MOD = 10^9 + 7
    total = SUM(nums)
    IF total < 2 * k: RETURN 0

    // dp[s] = number of subsets with sum s (for s < k)
    dp = [0] * k; dp[0] = 1
    FOR num IN nums:
        FOR s ← k-1 DOWNTO num:
            dp[s] = (dp[s] + dp[s - num]) % MOD

    bad = 2 * SUM(dp) % MOD    // each bad subset counted once for each side
    RETURN (pow(2, len(nums), MOD) - bad + MOD) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · k) |
| **Space** | O(k) |

---

## 5. Key Takeaway

> **Complementary counting: total - bad.** Count subsets with sum < k using 0/1 knapsack. Each bad subset contributes two bad partitions (one for each group). Elegant reversal of the problem.
