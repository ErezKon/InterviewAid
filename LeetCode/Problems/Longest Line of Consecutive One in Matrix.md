# 562. Longest Line of Consecutive One in Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix](https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix)
**Companies:** Google

---

## 1. Problem Description

Find the longest line of consecutive 1s in a binary matrix (horizontal, vertical, diagonal, or anti-diagonal).

---

## 2. Approach: DP in 4 Directions — O(m·n) ✅

```
FUNCTION longestLine(mat):
    m, n = dimensions
    // dp[r][c] = (horizontal, vertical, diagonal, anti-diagonal)
    dp = m×n of (0,0,0,0)
    maxLen = 0

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF mat[r][c] == 1:
                h = (dp[r][c-1][0] + 1 IF c > 0 ELSE 1)
                v = (dp[r-1][c][1] + 1 IF r > 0 ELSE 1)
                d = (dp[r-1][c-1][2] + 1 IF r > 0 AND c > 0 ELSE 1)
                a = (dp[r-1][c+1][3] + 1 IF r > 0 AND c < n-1 ELSE 1)
                dp[r][c] = (h, v, d, a)
                maxLen = MAX(maxLen, h, v, d, a)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(m · n) | O(m · n) |

---

## 3. Key Takeaway

> Track 4 directions per cell. Each direction extends from its predecessor. Similar to "Maximal Square" but for lines in 4 orientations.
