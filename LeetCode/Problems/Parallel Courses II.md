# 1494. Parallel Courses II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parallel-courses-ii](https://leetcode.com/problems/parallel-courses-ii)
**Companies:** Amazon, Google, Snowflake

---

```
// Bitmask DP: dp[mask] = min semesters to complete courses in mask
// For each state, find courses with all prerequisites met
// Try all subsets of available courses of size ≤ k
```
