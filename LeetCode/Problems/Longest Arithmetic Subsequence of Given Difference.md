# 1218. Longest Arithmetic Subsequence of Given Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference](https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference)
**Companies:** Google, Meta

---

## 1. Problem Description

Find the longest subsequence where consecutive elements differ by exactly `difference`.

---

## 2. Approach: Hash Map DP — O(n) ✅

```
FUNCTION longestSubsequence(arr, difference):
    dp = {}   // value → longest seq ending with this value
    maxLen = 0
    FOR num IN arr:
        dp[num] = dp.get(num - difference, 0) + 1
        maxLen = MAX(maxLen, dp[num])
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Unlike general arithmetic subsequence (O(n²)), fixed difference allows O(n): for each element, look up `num - difference` in the hash map.
