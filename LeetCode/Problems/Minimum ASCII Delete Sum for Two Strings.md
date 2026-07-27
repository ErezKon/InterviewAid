# 712. Minimum ASCII Delete Sum for Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings)
**Companies:** Amazon, Google, Meta, Triplebyte

---

## Key Insight

> LCS variant — instead of maximizing matched length, minimize the total **ASCII value** of deleted characters. DP where `dp[i][j]` = min delete cost to make `s1[0..i-1]` and `s2[0..j-1]` equal.

---

## Approach: DP — O(m·n) ✅

```
FUNCTION minimumDeleteSum(s1, s2):
    m, n ← LEN(s1), LEN(s2)
    dp ← (m+1) × (n+1) zeros

    FOR i ← 1 TO m DO dp[i][0] ← dp[i-1][0] + ORD(s1[i-1])
    FOR j ← 1 TO n DO dp[0][j] ← dp[0][j-1] + ORD(s2[j-1])

    FOR i ← 1 TO m DO
        FOR j ← 1 TO n DO
            IF s1[i-1] = s2[j-1] THEN
                dp[i][j] ← dp[i-1][j-1]
            ELSE
                dp[i][j] ← MIN(dp[i-1][j] + ORD(s1[i-1]),
                               dp[i][j-1] + ORD(s2[j-1]))

    RETURN dp[m][n]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| 2D DP | **O(m · n)** | **O(m · n)** |

---

## Key Takeaway

> **Weighted LCS** — same recurrence as edit distance / LCS, but the cost of deletion is the character's ASCII value rather than 1.

---
