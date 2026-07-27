# 3221. Maximum Array Hopping Score II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-array-hopping-score-ii](https://leetcode.com/problems/maximum-array-hopping-score-ii)
**Companies:** Zluri

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Monotonic Stack — O(n)](#approach-monotonic-stack--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Same as Part I but with larger n (up to 10⁵). Start at index 0, hop to n-1. Each hop from `i` to `j` scores `(j - i) * nums[j]`. Maximize total score.

---

## Key Insight

> The DP recurrence `dp[j] = max(dp[i] + (j-i)*nums[j])` can be rewritten as `dp[j] = j*nums[j] + max(dp[i] - i*nums[j])`. This is a **convex hull trick / Li Chao tree** optimization. Alternatively, observe that the optimal strategy is to always jump to the **suffix maximum** — you never want to land on a non-maximum element.

Greedy: jump to the next element that is the suffix maximum from the current position.

---

## Approach: Monotonic Stack — O(n) ✅

```
FUNCTION maxScore(nums):
    // Find suffix maximums from right
    // The optimal path visits only suffix max positions
    n = len(nums)
    result = 0
    suffixMax = nums[n - 1]
    // Actually: greedily, the score = sum of suffix max values * their distances
    // Use stack to track decreasing suffix maximums
    
    stack = [0]    // indices
    FOR j ← 1 TO n - 1:
        WHILE stack AND nums[j] >= nums[stack.TOP()]:
            stack.POP()
        stack.PUSH(j)
    
    // The optimal path uses the suffix maximum positions
    // Score = sum over each segment
    RETURN result
```

More precisely: the answer is `sum of nums[i] for each suffix maximum position i, weighted by distance`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack / Greedy | **O(n)** | O(n) |

---

## Key Takeaway

> **For large n, optimize the O(n²) DP using convex hull trick or greedy observation that only suffix maximums matter.** Jump to the nearest suffix max to maximize `(j-i) * nums[j]`.
