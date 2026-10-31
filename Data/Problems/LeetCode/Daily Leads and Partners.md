# 1693. Daily Leads and Partners

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/daily-leads-and-partners](https://leetcode.com/problems/daily-leads-and-partners)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Table: `DailySales`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| date_id     | date    |
| make_name   | varchar |
| lead_id     | int     |
| partner_id  | int     |
+-------------+---------+
There is no primary key (column with unique values) for this table. It may contain duplicates.
This table contains the date and the name of the product sold and the IDs of the lead and partner it was sold to.
The name consists of only lowercase English letters.
```

For each `date_id` and `make_name`, find the number of **distinct** `lead_id`'s and **distinct** `partner_id`'s.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  DailySales table:
  +-----------+-----------+---------+------------+
  | date_id   | make_name | lead_id | partner_id |
  +-----------+-----------+---------+------------+
  | 2020-12-8 | toyota    | 0       | 1          |
  | 2020-12-8 | toyota    | 1       | 0          |
  | 2020-12-8 | toyota    | 1       | 2          |
  | 2020-12-7 | toyota    | 0       | 2          |
  | 2020-12-7 | toyota    | 0       | 1          |
  | 2020-12-8 | honda     | 1       | 2          |
  | 2020-12-8 | honda     | 2       | 1          |
  | 2020-12-7 | honda     | 0       | 1          |
  | 2020-12-7 | honda     | 1       | 2          |
  | 2020-12-7 | honda     | 2       | 1          |
  +-----------+-----------+---------+------------+
  Output:
  +-----------+-----------+--------------+-----------------+
  | date_id   | make_name | unique_leads | unique_partners |
  +-----------+-----------+--------------+-----------------+
  | 2020-12-8 | toyota    | 2            | 3               |
  | 2020-12-7 | toyota    | 1            | 2               |
  | 2020-12-8 | honda     | 2            | 2               |
  | 2020-12-7 | honda     | 3            | 2               |
  +-----------+-----------+--------------+-----------------+
  Explanation:
  For 2020-12-8, toyota gets leads = [0, 1] and partners = [0, 1, 2] while honda gets leads = [1, 2] and partners = [1, 2].
  For 2020-12-7, toyota gets leads = [0] and partners = [1, 2] while honda gets leads = [0, 1, 2] and partners = [1, 2].
```

---

## Approach

```sql
SELECT date_id, make_name,
    COUNT(DISTINCT lead_id) AS unique_leads,
    COUNT(DISTINCT partner_id) AS unique_partners
FROM DailySales
GROUP BY date_id, make_name;
```

---

## Walkthrough

1. **GROUP BY** groups rows by `date_id` and `make_name`.
2. **COUNT(DISTINCT lead_id)** counts unique leads within each group.
3. **COUNT(DISTINCT partner_id)** counts unique partners within each group.
4. The SELECT returns one row per `(date_id, make_name)` with the two counts.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(N) – scans the table once |
| **Space** | O(G) – space for groups, where G is number of distinct `(date_id, make_name)` pairs |

---

## Key Takeaway

> **COUNT(DISTINCT) with GROUP BY provides per-group unique counts without extra subqueries.**