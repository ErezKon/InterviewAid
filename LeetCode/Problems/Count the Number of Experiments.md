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

## Key Takeaway

> **When all category combinations must appear (even with 0 count), generate the full grid with CROSS JOIN, then LEFT JOIN the data table. COUNT(nullable_column) correctly returns 0 for unmatched rows.**
