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

Given a `Logs` table with sequential IDs (some missing), find the start and end of each continuous range of IDs. (SQL problem)

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

| Logs (log_id) | Continuous Ranges |
|---------------|-------------------|
| 1,2,3,5,6,8   | [1,3], [5,6], [8,8] |
| 10,11,12,15   | [10,12], [15,15] |

*Explanation*: The `grp` value (`log_id - ROW_NUMBER()`) is constant for consecutive IDs, allowing grouping.

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
