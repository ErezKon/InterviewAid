# 3130. Find All Possible Stable Binary Arrays II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii)
**Companies:** Amazon, Ibm

---

## Problem Description

Same as Part I but with larger constraints (zero, one up to 1000). Count binary arrays with exactly `zero` 0s and `one` 1s, no `limit` or more consecutive same elements.

---

## Key Insight

> Same DP as Part I but needs optimization. Use prefix sums or inclusion-exclusion to handle the limit constraint efficiently within the O(zero × one) DP.

---

## Approach: Optimized DP — O(zero × one) ✅

Same recurrence as Part I with sliding window subtraction to enforce the consecutive limit constraint:

```
dp[i][j][0] = dp[i-1][j][0] + dp[i-1][j][1] - dp[i-limit-1][j][1]
dp[i][j][1] = dp[i][j-1][0] + dp[i][j-1][1] - dp[i][j-limit-1][0]
```

---

## Key Takeaway

> **Same logic as Part I, but the larger constraints demand careful modular arithmetic and efficient DP transitions without extra loops.**
