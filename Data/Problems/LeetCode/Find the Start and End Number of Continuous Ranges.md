# 1285. Find the Start and End Number of Continuous Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges](https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Gap-and-Island ✅](#2-approach-sql-gap-and-island-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

> *Note: premium SQL problem — schema/statement/example verified via doocs/leetcode.*

Table: `Logs`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| log_id        | int     |
+---------------+---------+
log_id is the column of unique values for this table.
Each row of this table contains the ID in a log Table.
```

Write a solution to find the start and end number of continuous ranges in the table `Logs`.

Return the result table ordered by `start_id`.

The result format is in the following example.

---

## 2. Approach: SQL Gap-and-Island ✅

```sql
SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id
FROM (
    SELECT log_id,
           log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp
    FROM Logs
) t
GROUP BY grp
ORDER BY start_id;
```

---

## 3. Examples

**Example 1:**
```
Input:
Logs table:
+------------+
| log_id     |
+------------+
| 1          |
| 2          |
| 3          |
| 7          |
| 8          |
| 10         |
+------------+
Output:
+------------+--------------+
| start_id   | end_id       |
+------------+--------------+
| 1          | 3            |
| 7          | 8            |
| 10         | 10           |
+------------+--------------+
Explanation:
The result table should contain all ranges in table Logs.
From 1 to 3 is contained in the table.
From 4 to 6 is missing in the table
From 7 to 8 is contained in the table.
Number 9 is missing from the table.
Number 10 is contained in the table.
```

*Key idea*: The `grp` value (`log_id - ROW_NUMBER()`) is constant for consecutive IDs, allowing grouping.

---

## 4. Walkthrough

1. **Assign Row Numbers** – `ROW_NUMBER()` gives a sequential index for each row ordered by `log_id`.
2. **Compute Group Identifier** – Subtract the row number from `log_id`; consecutive IDs share the same result.
3. **Group & Aggregate** – Group by this identifier and take `MIN` and `MAX` to get range bounds.
4. **Order Results** – Sort by `start_id` for readability.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(N) – single pass over the table with window function |
| **Space** | O(N) – temporary result set for grouping |

---

## 6. Key Takeaway

> Classic **gap-and-island** technique: `id - ROW_NUMBER()` produces the same value for consecutive IDs, creating natural groups.
