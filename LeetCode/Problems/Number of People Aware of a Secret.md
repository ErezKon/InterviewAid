# 2327. Number of People Aware of a Secret

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-people-aware-of-a-secret](https://leetcode.com/problems/number-of-people-aware-of-a-secret)
**Companies:** Amazon, Arcesium, Bloomberg, Google, Microsoft, Ncr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

On day 1, one person discovers a secret. After `delay` days they can share it; after `forget` days they forget. How many people know the secret on day `n`?

---

## 2. Key Insight

> `dp[i]` = new people who learn on day `i`. A person who learned on day `j` can share on days `[j+delay, j+forget-1]`. Sum over valid `j` for each day `i`.

---

## 3. Approach: DP — O(n²) ✅

```
FUNCTION peopleAwareOfSecret(n, delay, forget):
    MOD = 10^9 + 7
    dp = [0] * (n + 1)    // dp[i] = new people learning on day i
    dp[1] = 1

    FOR i ← 2 TO n:
        FOR j ← MAX(1, i - forget + 1) TO i - delay:
            dp[i] = (dp[i] + dp[j]) % MOD

    // People who haven't forgotten by day n
    RETURN SUM(dp[j] for j in range(max(1, n - forget + 1), n + 1)) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²), optimizable to O(n) with prefix sums |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **DP on "new learners per day" with delay/forget window.** Final answer sums people who learned within the last `forget` days. Can optimize inner loop with sliding window sum.
