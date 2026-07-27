# 3205. Maximum Array Hopping Score I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-array-hopping-score-i](https://leetcode.com/problems/maximum-array-hopping-score-i)
**Companies:** Zluri

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP — O(n²)](#approach-dp--on²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, start at index 0 and hop to index `n-1`. Each hop from `i` to `j` (j > i) scores `(j - i) * nums[j]`. Maximize the total score.

**Constraints:**
- `2 ≤ n ≤ 10³`

---

## Key Insight

> `dp[j]` = max score to reach index j. For each j, try all i < j: `dp[j] = max(dp[i] + (j-i) * nums[j])`. Since n ≤ 1000, O(n²) is fine.

---

## Approach: DP — O(n²) ✅

```
FUNCTION maxScore(nums):
    n = len(nums)
    dp = [0] * n
    FOR j ← 1 TO n - 1:
        FOR i ← 0 TO j - 1:
            dp[j] = MAX(dp[j], dp[i] + (j - i) * nums[j])
    RETURN dp[n - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n²)** | O(n) |

---

## Key Takeaway

> **Hop scoring problems with small n use straightforward O(n²) DP.** Each position considers all previous jump points.
