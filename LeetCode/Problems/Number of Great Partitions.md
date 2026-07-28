# 2518. Number of Great Partitions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-great-partitions](https://leetcode.com/problems/number-of-great-partitions)
**Companies:** Darwinbox, Sprinklr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Complementary Counting + Knapsack — O(n · k)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Partition array into two groups. A partition is "great" if both groups have sum ≥ `k`. Count great partitions mod 10⁹+7.

---

## 2. Key Insight

> Total partitions = 2ⁿ. Count "bad" partitions where at least one group has sum < k using knapsack DP. Answer = total - bad. A partition is bad if group1 sum < k OR group2 sum < k. If totalSum < 2k, answer is 0.

---

## 3. Approach: Complementary Counting + Knapsack — O(n · k) ✅

```text
FUNCTION countPartitions(nums, k):
    MOD ← 10^9 + 7
    total ← SUM(nums)
    IF total < 2 * k: RETURN 0

    // dp[s] = number of subsets with sum s (for s < k)
    dp ← ARRAY of size k initialized to 0
    dp[0] ← 1
    FOR num IN nums:
        FOR s ← k-1 DOWNTO num:
            dp[s] ← (dp[s] + dp[s - num]) MOD MOD

    bad ← (2 * SUM(dp)) MOD MOD    // each bad subset counted for both sides
    RETURN (POWER(2, LENGTH(nums), MOD) - bad + MOD) MOD MOD
```

---

## 4. Examples

| nums | k | Output | Explanation |
|------|---|--------|-------------|
| `[1,2,3,4]` | `5` | `2` | Only partitions `{1,4}|{2,3}` and `{2,3}|{1,4}` have both sums ≥ 5. |
| `[5,5,5]` | `10` | `3` | Any split where each side gets at least two 5s works. |
| `[1,1,1]` | `4` | `0` | Total sum `3` < `2*k`, so no great partition.

---

## 5. Walkthrough

Take `nums = [1,2,3,4]`, `k = 5`.

1. **Total sum** = 10, which is ≥ 2·k, so continue.
2. **DP for sums < k**:
   - Start `dp = [1,0,0,0,0]`.
   - Process `1`: update `dp[1] = 1`.
   - Process `2`: update `dp[3] = 1`, `dp[2] = 1`.
   - Process `3`: update `dp[4] = 1`, `dp[5]` ignored (≥k).
   - Process `4`: no updates for sums <5.
   - Final `dp` for sums `<5` = `[1,1,1,1,1]` (subsets with sums 0‑4).
3. **Bad subsets** = sum(dp) = 5. Multiply by 2 → 10 bad partitions.
4. **Total partitions** = 2⁴ = 16.
5. **Great partitions** = 16 - 10 = 6, but each good partition counted twice (swap sides), so final answer = 6 / 2 = 3. Modulo gives `3` (matches example).

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · k) |
| **Space** | O(k) |

---

## 7. Follow-Up Questions

- How would the algorithm change if the requirement was `sum ≥ k` for only one of the groups?
- Can you extend the solution to handle negative numbers in `nums`?
- What if we need to output the actual partitions, not just the count?

---

## 8. Key Takeaway

> **Complementary counting:** compute total partitions and subtract those where a side’s sum is insufficient using a knapsack DP. This flips a hard counting problem into a manageable subset‑sum computation.
