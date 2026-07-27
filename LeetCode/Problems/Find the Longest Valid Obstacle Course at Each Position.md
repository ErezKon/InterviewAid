# 1964. Find the Longest Valid Obstacle Course at Each Position

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position](https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position)
**Companies:** Google, Morgan Stanley

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: LIS with Binary Search — O(n log n) ✅](#4-approach-lis-with-binary-search--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `obstacles`, for each position `i`, find the length of the longest non-decreasing subsequence ending at `i`. Return the array of lengths.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= obstacles[i] <= 10⁷`

---

## 2. Examples

```
Example 1:
  Input:  obstacles = [1, 2, 3, 2]
  Output: [1, 2, 3, 3]
  Reason: At index 3, longest non-decreasing subsequence ending here is [1,2,2] → length 3.
```

---

## 3. Key Insight

> This is **Longest Non-Decreasing Subsequence (LNDS)** computed for every prefix. Use the patience sorting technique: maintain a list of "tails" and binary search for insertion using `bisect_right` (right bisect allows equal elements).

---

## 4. Approach: LIS with Binary Search — O(n log n) ✅

```
FUNCTION longestObstacleCourse(obstacles):
    tails ← []
    result ← []
    FOR obs IN obstacles DO
        pos ← bisect_right(tails, obs)
        IF pos == LENGTH(tails) THEN
            tails.APPEND(obs)
        ELSE
            tails[pos] ← obs
        result.APPEND(pos + 1)
    RETURN result
```

---

## 5. Walkthrough

```
obstacles = [1, 2, 3, 2]

obs=1: bisect_right([], 1) = 0, tails=[1], result=[1]
obs=2: bisect_right([1], 2) = 1, tails=[1,2], result=[1,2]
obs=3: bisect_right([1,2], 3) = 2, tails=[1,2,3], result=[1,2,3]
obs=2: bisect_right([1,2,3], 2) = 2, tails=[1,2,2], result=[1,2,3,3]

Result: [1, 2, 3, 3] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — n binary searches |
| **Space** | O(n) — tails array |

---

## 7. Key Takeaway

> **bisect_right for non-decreasing LIS** — using right bisect allows equal elements to extend the subsequence, unlike strict LIS which uses `bisect_left`. Same patience sorting technique, different bisect function.
