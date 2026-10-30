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

> *Note: premium SQL problem — schema/statement/example verified via doocs/leetcode. Official ordering is **descending** (by peak calling hour, then city) — check the Approach's ORDER BY.*

Table: `Calls`

```
+--------------+----------+
| Column Name  | Type     |
+--------------+----------+
| caller_id    | int      |
| recipient_id | int      |
| call_time    | datetime |
| city         | varchar  |
+--------------+----------+
(caller_id, recipient_id, call_time) is the primary key (combination of columns with unique values) for this table.
Each row contains caller id, recipient id, call time, and city.
```

Write a solution to find the **peak** calling **hour** for each `city`. If **multiple hours** have the **same** number of calls, all of those hours will be recognized as **peak hours** for that specific city.

Return *the result table ordered by **peak calling hour** and* `city` *in **descending** order* (columns: `city`, `peak_calling_hour`, `number_of_calls`).

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
Calls table:
+-----------+--------------+---------------------+----------+
| caller_id | recipient_id | call_time           | city     |
+-----------+--------------+---------------------+----------+
| 8         | 4            | 2021-08-24 22:46:07 | Houston  |
| 4         | 8            | 2021-08-24 22:57:13 | Houston  |
| 5         | 1            | 2021-08-11 21:28:44 | Houston  |
| 8         | 3            | 2021-08-17 22:04:15 | Houston  |
| 11        | 3            | 2021-08-17 13:07:00 | New York |
| 8         | 11           | 2021-08-17 14:22:22 | New York |
+-----------+--------------+---------------------+----------+
Output:
+----------+-------------------+-----------------+
| city     | peak_calling_hour | number_of_calls |
+----------+-------------------+-----------------+
| Houston  | 22                | 3               |
| New York | 14                | 1               |
| New York | 13                | 1               |
+----------+-------------------+-----------------+
Explanation:
For Houston:
  - The peak time is 22:00, with a total of 3 calls recorded.
For New York:
  - Both 13:00 and 14:00 hours have equal call counts of 1, so both times are considered peak hours.
Output table is ordered by peak_calling_hour and city in descending order.
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
