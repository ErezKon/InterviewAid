# 3472. Longest Palindromic Subsequence After at Most K Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindromic-subsequence-after-at-most-k-operations](https://leetcode.com/problems/longest-palindromic-subsequence-after-at-most-k-operations)
**Companies:** Google

---

## 1. Problem Description

Find the longest palindromic subsequence where you can change at most `k` characters (each change costs the circular distance between characters).

---

## 2. Approach: 2D DP with Cost Budget — O(n²·k) ✅

```
// dp[i][j][cost] = longest palindromic subseq of s[i..j] using ≤ cost changes
// If s[i] == s[j]: dp[i][j][c] = dp[i+1][j-1][c] + 2
// Else: try changing one to match the other (cost = circular distance)
//       dp[i][j][c] = dp[i+1][j-1][c - dist] + 2 if c >= dist
//       Also consider skipping: max(dp[i+1][j][c], dp[i][j-1][c])
```

| Time | Space |
|------|-------|
| O(n² · k) | O(n² · k) |

---

## 3. Key Takeaway

> Extension of standard LPS DP with a third dimension for change budget. Cost of matching `s[i]` to `s[j]` = min circular distance between the two characters.
