# 2984. Find Peak Calling Hours for Each City

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-peak-calling-hours-for-each-city](https://leetcode.com/problems/find-peak-calling-hours-for-each-city)
**Companies:** De Shaw

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: GROUP BY + Window Function — O(n log n) ✅](#4-approach-group-by--window-function--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a table `Calls` with columns `caller_id`, `recipient_id`, `call_time`, and `city`. Write a SQL query to find the **peak calling hour(s)** for each city — the hour(s) with the highest number of calls.

If there is a tie, return all tied hours. Order the result by `city` and `peak_calling_hour`.

---

## 2. Examples

```
Input:
Calls table:
| caller_id | recipient_id | call_time           | city     |
|-----------|-------------|---------------------|----------|
| 1         | 2           | 2021-01-01 09:12:00 | Houston  |
| 2         | 3           | 2021-01-01 09:45:00 | Houston  |
| 3         | 4           | 2021-01-01 15:30:00 | Houston  |
| 1         | 5           | 2021-01-02 09:20:00 | Houston  |
| 4         | 5           | 2021-01-01 10:00:00 | Chicago  |
| 5         | 6           | 2021-01-01 10:15:00 | Chicago  |
| 6         | 7           | 2021-01-01 14:00:00 | Chicago  |

Output:
| city    | peak_calling_hour | number_of_calls |
|---------|-------------------|-----------------|
| Chicago | 10                | 2               |
| Houston | 9                 | 3               |

Explanation:
  Houston had 3 calls at hour 9 (two on Jan 1, one on Jan 2), which is the most.
  Chicago had 2 calls at hour 10, which is the most.
```

---

## 3. Key Insight

> Extract the **hour** from `call_time`, count calls per (city, hour), then use `RANK()` to find the hour(s) with the maximum call count in each city.

---

## 4. Approach: GROUP BY + Window Function — O(n log n) ✅

```
-- Step 1: Count calls per city per hour
WITH HourlyCounts AS (
    SELECT city,
           HOUR(call_time) AS calling_hour,
           COUNT(*)        AS num_calls
    FROM Calls
    GROUP BY city, HOUR(call_time)
),

-- Step 2: Rank hours within each city by call count
Ranked AS (
    SELECT city,
           calling_hour,
           num_calls,
           RANK() OVER (PARTITION BY city ORDER BY num_calls DESC) AS rk
    FROM HourlyCounts
)

-- Step 3: Pick peak hour(s)
SELECT city,
       calling_hour AS peak_calling_hour,
       num_calls    AS number_of_calls
FROM Ranked
WHERE rk = 1
ORDER BY city, peak_calling_hour;
```

---

## 5. Walkthrough

```
Input Calls (relevant columns):
  Houston: hours [9, 9, 15, 9]  →  hour 9: 3 calls, hour 15: 1 call
  Chicago: hours [10, 10, 14]   →  hour 10: 2 calls, hour 14: 1 call

HourlyCounts:
  | city    | calling_hour | num_calls |
  |---------|-------------|-----------|
  | Houston | 9           | 3         |
  | Houston | 15          | 1         |
  | Chicago | 10          | 2         |
  | Chicago | 14          | 1         |

Ranked (RANK by num_calls DESC per city):
  Houston: hour 9 → rk=1, hour 15 → rk=2
  Chicago: hour 10 → rk=1, hour 14 → rk=2

WHERE rk = 1 →
  | city    | peak_calling_hour | number_of_calls |
  |---------|-------------------|-----------------|
  | Chicago | 10                | 2               |
  | Houston | 9                 | 3               |
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — grouping + window function |
| **Space** | O(n) — intermediate CTE results |

---

## 7. Follow-Up Questions

### 7.1 What if there are ties?

`RANK()` naturally handles ties — all hours sharing the max count get `rk = 1`. Using `ROW_NUMBER()` would arbitrarily pick one.

### 7.2 What if you want the peak calling hour per city per day?

Add `DATE(call_time)` to the `GROUP BY` and `PARTITION BY` clauses.

### 7.3 Could you solve this without window functions?

Yes — use a subquery to find `MAX(num_calls)` per city, then join back. Window functions are cleaner.

---

## 8. Key Takeaway

> **RANK() over a GROUP BY aggregate** is the standard pattern for "find the top-K per group" SQL problems. Extract the dimension (hour), aggregate (count), rank, and filter.
