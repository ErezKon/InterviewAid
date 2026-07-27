# 2407. Longest Increasing Subsequence II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-increasing-subsequence-ii](https://leetcode.com/problems/longest-increasing-subsequence-ii)
**Companies:** Google

---

## 1. Problem Description

Find the LIS where the difference between consecutive elements is at most `k`.

---

## 2. Approach: Segment Tree — O(n log M) ✅

```
// dp[v] = longest subseq ending with value v
// For each nums[i], query max dp in range [nums[i]-k, nums[i]-1]
// Update dp[nums[i]] = query_result + 1
// Use segment tree for range max query + point update
```

| Time | Space |
|------|-------|
| O(n · log M) where M = max value | O(M) |

---

## 3. Key Takeaway

> Standard LIS with a window constraint on values. Segment tree enables O(log M) range-max queries over `[val-k, val-1]`, turning O(n²) DP into O(n log M).
