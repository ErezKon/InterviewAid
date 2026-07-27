# 3336. Find the Number of Subsequences With Equal GCD

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-subsequences-with-equal-gcd](https://leetcode.com/problems/find-the-number-of-subsequences-with-equal-gcd)
**Companies:** Google, Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP on GCD Pairs — O(n · G²) ✅](#3-approach-dp-on-gcd-pairs--on--g²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given array `nums`, count the number of ways to split it into two non-empty subsequences such that both have the same GCD.

**Constraints:**
- `1 <= n <= 200`
- `1 <= nums[i] <= 200`

---

## 2. Key Insight

> Track DP over `(gcd1, gcd2)` pairs as we assign each element to subsequence 1, subsequence 2, or neither. Count states where `gcd1 == gcd2` at the end.

---

## 3. Approach: DP on GCD Pairs — O(n · G²) ✅

```
FUNCTION subsequenceCount(nums):
    G ← MAX(nums)
    // dp[g1][g2] = number of ways to partition prefix into two subsequences
    //              with GCD g1 and g2 respectively
    dp ← (G+1) × (G+1) of 0
    dp[0][0] ← 1    // both empty

    FOR num IN nums DO
        newDp ← copy of dp
        FOR g1 ← 0 TO G DO
            FOR g2 ← 0 TO G DO
                IF dp[g1][g2] == 0 THEN CONTINUE
                // Assign num to subsequence 1
                newDp[GCD(g1, num)][g2] += dp[g1][g2]
                // Assign num to subsequence 2
                newDp[g1][GCD(g2, num)] += dp[g1][g2]
        dp ← newDp

    result ← SUM(dp[g][g] for g ← 1 TO G)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · G²) where G = max value |
| **Space** | O(G²) |

---

## 5. Key Takeaway

> **DP on GCD pairs** handles the partition constraint. Each element goes to one of two subsequences (or neither), and we track the running GCD of each. Count equal-GCD states at the end.
