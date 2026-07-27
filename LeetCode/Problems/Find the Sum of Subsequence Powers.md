# 3098. Find the Sum of Subsequence Powers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-sum-of-subsequence-powers](https://leetcode.com/problems/find-the-sum-of-subsequence-powers)
**Companies:** Rubrik

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + DP with Min-Diff Tracking — O(n²k) ✅](#3-approach-sort--dp-with-min-diff-tracking)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given array `nums` and integer `k`, the **power** of a subsequence is the minimum absolute difference between any two elements. Return the sum of powers of all subsequences of length `k`, mod 10⁹+7.

**Constraints:**
- `2 <= n <= 50`
- `2 <= k <= n`

---

## 2. Key Insight

> Sort the array. Then use DP: `dp[i][j][minDiff]` = count of subsequences of length `j` ending at index `i` with minimum adjacent difference `minDiff`. Since n ≤ 50, the number of distinct differences is manageable with memoization.

---

## 3. Approach: Sort + DP with Min-Diff Tracking — O(n²k) ✅

```
FUNCTION sumOfPowers(nums, k):
    SORT(nums)
    // Memoized DFS: (index, count, lastPicked, minDiff) → sum of powers
    // At each index, choose to include or skip
    // When count == k, add minDiff to result

    RETURN dfs(0, 0, -1, INF)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² · k · D) where D = distinct differences |
| **Space** | O(n · k · D) — memoization |

---

## 5. Key Takeaway

> Sort first to make differences easy to compute. Use **memoized DFS** with `(index, count, lastIndex, minDiff)` as state. The small n (≤ 50) makes this feasible.
