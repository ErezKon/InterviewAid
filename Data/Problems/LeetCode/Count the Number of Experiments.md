# 1990. Count the Number of Experiments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-experiments](https://leetcode.com/problems/count-the-number-of-experiments)
**Companies:** Strava

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Experiments`

```
+-----------------+------+
| Column Name     | Type |
+-----------------+------+
| experiment_id   | int  |
| platform        | enum |
| experiment_name | enum |
+-----------------+------+
experiment_id is the column with unique values for this table.
platform is an enum (category) type of values ('Android', 'IOS', 'Web').
experiment_name is an enum (category) type of values ('Reading', 'Sports', 'Programming').
This table contains information about the ID of an experiment done with a random person, the platform used to do the experiment, and the name of the experiment.
```

Write a solution to report the **number of experiments** done on each of the three platforms for each of the three given experiments. Notice that all the pairs of (platform, experiment) should be included in the output **including** the pairs with **zero experiments**.

Return the result table in **any order**.

The result format is in the following example.

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
Input:
Experiments table:
+---------------+----------+-----------------+
| experiment_id | platform | experiment_name |
+---------------+----------+-----------------+
| 4             | IOS      | Programming     |
| 13            | IOS      | Sports          |
| 14            | Android  | Reading         |
| 8             | Web      | Reading         |
| 12            | Web      | Reading         |
| 18            | Web      | Programming     |
+---------------+----------+-----------------+
Output:
+----------+-----------------+-----------------+
| platform | experiment_name | num_experiments |
+----------+-----------------+-----------------+
| Android  | Reading         | 1               |
| Android  | Sports          | 0               |
| Android  | Programming     | 0               |
| IOS      | Reading         | 0               |
| IOS      | Sports          | 1               |
| IOS      | Programming     | 1               |
| Web      | Reading         | 2               |
| Web      | Sports          | 0               |
| Web      | Programming     | 1               |
+----------+-----------------+-----------------+
Explanation:
On the platform "Android", we had only one "Reading" experiment.
On the platform "IOS", we had one "Sports" experiment and one "Programming" experiment.
On the platform "Web", we had two "Reading" experiments and one "Programming" experiment.
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