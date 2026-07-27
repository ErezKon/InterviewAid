# 2945. Find Maximum Non-decreasing Array Length

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-maximum-non-decreasing-array-length](https://leetcode.com/problems/find-maximum-non-decreasing-array-length)
**Companies:** Amazon, Google, Medianet, Tiktok

---

```
// DP + monotone queue optimization
// dp[i] = max segments for first i elements where result is non-decreasing
// Use prefix sums and binary search/deque for O(n) or O(n log n)
```
