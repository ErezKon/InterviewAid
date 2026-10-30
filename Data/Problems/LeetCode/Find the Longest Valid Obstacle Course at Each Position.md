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

You want to build some obstacle courses. You are given a **0-indexed** integer array `obstacles` of length `n`, where `obstacles[i]` describes the height of the `i`-th obstacle.

For every index `i` between `0` and `n - 1` (**inclusive**), find the length of the **longest obstacle course** in `obstacles` such that:

- You choose any number of obstacles between `0` and `i` **inclusive**.
- You must include the `i`-th obstacle in the course.
- You must put the chosen obstacles in the **same order** as they appear in `obstacles`.
- Every obstacle (except the first) is **taller** than or the **same height** as the obstacle immediately before it.

Return *an array* `ans` *of length* `n`, *where* `ans[i]` *is the length of the **longest obstacle course** for index* `i` *as described above*.

**Constraints:**
- `n == obstacles.length`
- `1 <= n <= 10⁵`
- `1 <= obstacles[i] <= 10⁷`

---

## 2. Examples

```
Example 1:
  Input: obstacles = [1,2,3,2]
  Output: [1,2,3,3]
  Explanation: The longest valid obstacle course at each position is:
  - i = 0: [1], [1] has length 1.
  - i = 1: [1,2], [1,2] has length 2.
  - i = 2: [1,2,3], [1,2,3] has length 3.
  - i = 3: [1,2,3,2], [1,2,2] has length 3.

Example 2:
  Input: obstacles = [2,2,1]
  Output: [1,2,1]
  Explanation: The longest valid obstacle course at each position is:
  - i = 0: [2], [2] has length 1.
  - i = 1: [2,2], [2,2] has length 2.
  - i = 2: [2,2,1], [1] has length 1.

Example 3:
  Input: obstacles = [3,1,5,6,4,2]
  Output: [1,1,2,3,2,2]
  Explanation: The longest valid obstacle course at each position is:
  - i = 0: [3], [3] has length 1.
  - i = 1: [3,1], [1] has length 1.
  - i = 2: [3,1,5], [3,5] has length 2. [1,5] is also valid.
  - i = 3: [3,1,5,6], [3,5,6] has length 3. [1,5,6] is also valid.
  - i = 4: [3,1,5,6,4], [3,4] has length 2. [1,4] is also valid.
  - i = 5: [3,1,5,6,4,2], [1,2] has length 2.
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
