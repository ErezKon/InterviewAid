# 2989. Class Performance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/class-performance](https://leetcode.com/problems/class-performance)
**Companies:** Google

---

## 1. Problem Description

Given a `Scores` table with columns `student_id` and `score`, return the difference between the highest and lowest scores in the class. This is a SQL aggregation query.

## 2. Examples

| Scores Table | Result |
|--------------|--------|
| `[(1, 85), (2, 92), (3, 78)]` | `14` |
| `[(10, 50), (11, 50), (12, 50)]` | `0` |
| `[(5, 100), (6, 0)]` | `100` |

*Explanation*: `MAX(score) - MIN(score)` yields the range.

## 3. Approach — MAX minus MIN aggregation — O(n) ✅

```sql
SELECT MAX(score) - MIN(score) AS score_range
FROM Scores;
```

## 4. Walkthrough

1. Scan the `Scores` table to find the maximum score (`MAX`).
2. Scan again (or in the same pass) to find the minimum score (`MIN`).
3. Subtract the minimum from the maximum to obtain the range.
4. Return the computed `score_range`.

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(N) – each row is examined once |
| Space  | O(1) – only two scalar values are stored |

## 6. Follow-Up Questions

- How would you modify the query to compute the range for each class if a `class_id` column existed?
- Can you write a single‑pass algorithm in a procedural language to achieve the same result without using SQL aggregates?
- How would you handle `NULL` scores in the table?

## Key Takeaway

> Simple aggregate range query: `MAX(col) - MIN(col)` gives the spread of values in a single pass.
