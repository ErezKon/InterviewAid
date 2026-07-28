# 2251. Number of Flowers in Full Bloom

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-flowers-in-full-bloom](https://leetcode.com/problems/number-of-flowers-in-full-bloom)
**Companies:** Capital One, Cohesity, Databricks, Google, Oracle, Phonepe, Roblox, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search on Sorted Start/End — O((n+m) log n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given `n` flower intervals `flowers[i] = [start_i, end_i]` and `m` arrival times `people`, return an array where each element is the number of flowers in bloom at the corresponding arrival time.

---

## 2. Examples

| flowers | people | Output | Explanation |
|---------|--------|--------|-------------|
| `[[1,6],[3,7],[9,12],[4,13]]` | `[2,3,7,11]` | `[1,3,2,2]` | At time 2 only the first flower is active. At time 3 three flowers are active, etc. |
| `[[1,10]]` | `[5,10,11]` | `[1,1,0]` | Single interval covers 5 and 10 but not 11. |

---

## 3. Key Insight

> Active flowers at time `t` = (flowers that started ≤ `t`) − (flowers that ended < `t`). By sorting start times and end times separately we can answer each query with two binary searches.

---

## 4. Approach: Binary Search on Sorted Start/End — O((n+m) log n) ✅

```text
FUNCTION fullBloomFlowers(flowers, people):
    SET starts ← SORT([s FOR s, e IN flowers])
    SET ends ← SORT([e FOR s, e IN flowers])
    SET result ← []
    FOR time IN people:
        SET started ← UPPER_BOUND(starts, time)   // count of starts ≤ time
        SET ended ← LOWER_BOUND(ends, time)       // count of ends < time
        APPEND (started - ended) TO result
    RETURN result
```

---

## 5. Walkthrough

Consider `flowers = [[1,6],[3,7],[9,12],[4,13]]` and `people = [2,3,7,11]`.

1. `starts = [1,3,4,9]`, `ends = [6,7,12,13]`.
2. Query `time = 2`:
   - `started = UPPER_BOUND([1,3,4,9], 2) = 1` (only start 1 ≤ 2)
   - `ended = LOWER_BOUND([6,7,12,13], 2) = 0`
   - active = 1‑0 = 1.
3. Query `time = 3`:
   - `started = 2` (1 and 3)
   - `ended = 0`
   - active = 2.
4. Continue similarly for 7 and 11, yielding `[1,3,2,2]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O((n + m) log n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

1. How would you handle updates where a flower interval is added or removed after the initial preprocessing?
2. Can you answer queries in O(log n) time without sorting both arrays each time?
3. What changes are needed if queries are given in a streaming fashion (online) rather than all at once?

---

## 8. Key Takeaway

> **Separate start and end arrays + binary search** gives an efficient way to count active intervals at any point in time.
