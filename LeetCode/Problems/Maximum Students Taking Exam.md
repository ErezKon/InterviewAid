# 1349. Maximum Students Taking Exam

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-students-taking-exam](https://leetcode.com/problems/maximum-students-taking-exam)
**Companies:** Google, Microsoft, Sap

---

## Approach: Bitmask DP — O(m · 2ⁿ · 2ⁿ) ✅

```
// For each row, enumerate valid seat masks (no adjacent, only good seats)
// dp[mask] = max students for current row with seat configuration mask
// Check compatibility with previous row (no diagonal cheating)
```
