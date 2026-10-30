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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums` of length `n`, and a **positive** integer `k`.

The **power** of a subsequence is defined as the **minimum** absolute difference between **any** two elements in the subsequence.

Return *the **sum** of **powers** of **all** subsequences of *`nums`* which have length* ***equal to*** `k`.

Since the answer may be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= n == nums.length <= 50`
- `-10^8 <= nums[i] <= 10^8 `
- `2 <= k <= n`

---

## 2. Key Insight

> Sort the array. Then use DP: `dp[i][j][minDiff]` = count of subsequences of length `j` ending at index `i` with minimum adjacent difference `minDiff`. Since n ≤ 50, the number of distinct differences is manageable with memoization.

---

## 3. Approach: Sort + DP with Min-Diff Tracking — O(n²k) ✅

```text
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

## 5. Examples

**Example 1:**
```
Input: nums = [1,2,3,4], k = 3
Output: 4
Explanation: There are 4 subsequences in nums which have length 3: [1,2,3], [1,3,4], [1,2,4], and [2,3,4]. The sum of powers is |2 - 3| + |3 - 4| + |2 - 1| + |3 - 4| = 4.
```

**Example 2:**
```
Input: nums = [2,2], k = 2
Output: 0
Explanation: The only subsequence in nums which has length 2 is [2,2]. The sum of powers is |2 - 2| = 0.
```

**Example 3:**
```
Input: nums = [4,3,-1], k = 2
Output: 10
Explanation: There are 3 subsequences in nums which have length 2: [4,3], [4,-1], and [3,-1]. The sum of powers is |4 - 3| + |4 - (-1)| + |3 - (-1)| = 10.
```

---

## 6. Walkthrough

Consider `nums = [1,3,6]`, `k = 2`.
1. **Sort** → `[1,3,6]`.
2. **DFS start** at index 0, count 0, lastPicked = -1, minDiff = INF.
3. Include `1` → recurse index 1, count 1, lastPicked = 0, minDiff = INF.
4. At index 1, include `3` → new minDiff = MIN(INF, |3-1|) = 2, count 2 → add 2 to result.
5. Backtrack, include `6` instead of `3` → minDiff = 5, add 5.
6. Backtrack to start, skip `1`, include `3` then `6` → minDiff = 3, add 3.
Total = 2+5+3 = 10.

---

## 7. Key Takeaway

> Sort first to make differences easy to compute. Use **memoized DFS** with `(index, count, lastIndex, minDiff)` as state. The small n (≤ 50) makes this feasible.
