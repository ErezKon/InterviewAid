# 3409. Longest Subsequence With Decreasing Adjacent Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference](https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference)
**Companies:** Google, Juspay

---

## 1. Problem Description

Find the longest subsequence where the absolute difference between consecutive elements is non-increasing.

---

## 2. Approach: DP — O(n · M) ✅

```
// dp[val][diff] = longest subseq ending with value 'val' and last diff 'diff'
// For each element, try extending all valid previous states
// Suffix max optimization on the diff dimension
```

| Time | Space |
|------|-------|
| O(n · M) where M = max value | O(M²) |

---

## 3. Key Takeaway

> Track both the last value and the last absolute difference. A new element can extend a subsequence only if its absolute difference ≤ the previous difference. Use suffix max arrays for optimization.
