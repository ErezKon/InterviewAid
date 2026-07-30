# 1990. Count the Number of Experiments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-experiments](https://leetcode.com/problems/count-the-number-of-experiments)
**Companies:** Strava

---

## Problem Description

SQL problem: Given an `Experiments` table with `experiment_id`, `platform` (Android/IOS/Web), and `experiment_name` (Reading/Sports/Programming), return the count of experiments for each platform-experiment combination. Show 0 for combinations with no experiments.

---

## Approach

```sql
WITH platforms AS (
    SELECT 'Android' AS platform UNION ALL
    SELECT 'IOS' UNION ALL
    SELECT 'Web'
),
experiments AS (
    SELECT 'Reading' AS experiment_name UNION ALL
    SELECT 'Sports' UNION ALL
    SELECT 'Programming'
)
SELECT p.platform, e.experiment_name,
       COUNT(ex.experiment_id) AS num_experiments
FROM platforms p
CROSS JOIN experiments e
LEFT JOIN Experiments ex
    ON p.platform = ex.platform AND e.experiment_name = ex.experiment_name
GROUP BY p.platform, e.experiment_name;
```

---

## Examples

**Example 1:**
```
Experiments table:
+----+----------+-----------------
| id | platform | experiment_name |
+----+----------+-----------------
| 1  | Android  | Reading         |
| 2  | IOS      | Sports          |
| 3  | Web      | Programming     |
+----+----------+-----------------
```
Result:
```
+----------+-----------------+-------------------+
| platform | experiment_name | num_experiments |
+----------+-----------------+-------------------+
| Android  | Reading         | 1 |
| Android  | Sports          | 0 |
| Android  | Programming     | 0 |
| IOS      | Reading         | 0 |
| IOS      | Sports          | 1 |
| IOS      | Programming     | 0 |
| Web      | Reading         | 0 |
| Web      | Sports          | 0 |
| Web      | Programming     | 1 |
+----------+-----------------+-------------------+
```

---

## Walkthrough

1. **Generate full grid** – `platforms` CTE lists all three platforms, `experiments` CTE lists all three experiment types. `CROSS JOIN` creates nine combinations.
2. **Left join** – Attach actual rows from `Experiments`. If a combination has no matching row, `ex.experiment_id` is `NULL`.
3. **Count** – `COUNT(ex.experiment_id)` counts only non‑NULL ids, yielding `0` for missing combos.
4. **Group** – Group by both dimensions to produce one row per combination.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(N) to scan the `Experiments` table; the CTEs are constant size (3×3).
| **Space** | O(1) extra beyond the result set.

---

## Key Takeaway

> **When all category combinations must appear (even with 0 count), generate the full grid with CROSS JOIN, then LEFT JOIN the data table. COUNT(nullable_column) correctly returns 0 for unmatched rows.**