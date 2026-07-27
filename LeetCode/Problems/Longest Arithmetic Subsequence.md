# 1027. Longest Arithmetic Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-arithmetic-subsequence](https://leetcode.com/problems/longest-arithmetic-subsequence)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Snapdeal, Turing

---

## 1. Problem Description

Find the length of the longest arithmetic subsequence in `nums` (not necessarily contiguous).

---

## 2. Approach: DP with Hash Maps — O(n²) ✅

`dp[i][d]` = length of longest arithmetic subsequence ending at index `i` with common difference `d`.

```
FUNCTION longestArithSeqLength(nums):
    dp = [{} for _ in range(n)]    // dp[i] = {diff: length}
    maxLen = 2

    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            diff = nums[i] - nums[j]
            dp[i][diff] = dp[j].get(diff, 1) + 1
            maxLen = MAX(maxLen, dp[i][diff])

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## 3. Key Takeaway

> For each pair `(j, i)`, compute diff and extend the chain from `dp[j][diff]`. Hash maps per index store all possible differences. Similar pattern to Longest Fibonacci Subsequence.
