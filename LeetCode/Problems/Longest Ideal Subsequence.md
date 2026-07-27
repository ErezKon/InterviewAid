# 2370. Longest Ideal Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-ideal-subsequence](https://leetcode.com/problems/longest-ideal-subsequence)
**Companies:** Makemytrip, Microsoft

---

## 1. Problem Description

Find the longest subsequence where the absolute difference between consecutive characters is ≤ `k`.

---

## 2. Approach: DP on 26 Characters — O(n·k) ✅

```
FUNCTION longestIdealString(s, k):
    dp = [0] * 26   // dp[c] = longest ideal subseq ending with char c
    FOR char IN s:
        c = ord(char) - ord('a')
        best = 0
        FOR j ← MAX(0, c-k) TO MIN(25, c+k):
            best = MAX(best, dp[j])
        dp[c] = best + 1
    RETURN MAX(dp)
```

| Time | Space |
|------|-------|
| O(n · k) | O(26) = O(1) |

---

## 3. Key Takeaway

> Track the best subsequence length ending at each of 26 characters. For each new char, look at characters within distance `k` and extend the best one.
