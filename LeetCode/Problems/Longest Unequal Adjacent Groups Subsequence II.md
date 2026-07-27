# 2901. Longest Unequal Adjacent Groups Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii)
**Companies:** Fourkites, Meta

---

## 1. Problem Description

Find the longest subsequence of words where adjacent words have different groups and Hamming distance of 1.

---

## 2. Approach: DP — O(n²·L) ✅

```
// dp[i] = longest valid subsequence ending at index i
// For each i, check all j < i:
//   if groups[i] != groups[j] AND len(words[i]) == len(words[j])
//   AND hammingDistance(words[i], words[j]) == 1:
//     dp[i] = max(dp[i], dp[j] + 1)
// Reconstruct using parent pointers
```

| Time | Space |
|------|-------|
| O(n² · L) | O(n) |

---

## 3. Key Takeaway

> LIS-style DP with two constraints: different groups and Hamming distance exactly 1. Use parent pointers for reconstruction.
