# 601. Human Traffic of Stadium

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/human-traffic-of-stadium](https://leetcode.com/problems/human-traffic-of-stadium)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok, Uber

---

## 1. Problem Description

Table: `Stadium`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| visit_date    | date    |
| people        | int     |
+---------------+---------+
visit_date is the column with unique values for this table.
Each row of this table contains the visit date and visit id to the stadium with the number of people during the visit.
As the id increases, the date increases as well.
```

Write a solution to display the records with three or more rows with **consecutive** `id`'s, and the number of people is greater than or equal to 100 for each.

Return the result table ordered by `visit_date` in **ascending order**.

The result format is in the following example.

## 2. Examples

**Example 1:**
```
Input:
Stadium table:
+------+------------+-----------+
| id   | visit_date | people    |
+------+------------+-----------+
| 1    | 2017-01-01 | 10        |
| 2    | 2017-01-02 | 109       |
| 3    | 2017-01-03 | 150       |
| 4    | 2017-01-04 | 99        |
| 5    | 2017-01-05 | 145       |
| 6    | 2017-01-06 | 1455      |
| 7    | 2017-01-07 | 199       |
| 8    | 2017-01-09 | 188       |
+------+------------+-----------+
Output:
+------+------------+-----------+
| id   | visit_date | people    |
+------+------------+-----------+
| 5    | 2017-01-05 | 145       |
| 6    | 2017-01-06 | 1455      |
| 7    | 2017-01-07 | 199       |
| 8    | 2017-01-09 | 188       |
+------+------------+-----------+
Explanation:
The four rows with ids 5, 6, 7, and 8 have consecutive ids and each of them has >= 100 people attended. Note that row 8 was included even though the visit_date was not the next day after row 7.
The rows with ids 2 and 3 are not included because we need at least three consecutive ids.
```

## 3. Walkthrough

1. Self-join the table three times (s1, s2, s3).
2. Ensure each join pair represents consecutive days by checking `id` differences (-1, +1, etc.).
3. Filter each alias to have `people >= 100`.
4. Select distinct rows from the first alias to avoid duplicates.

## 4. Complexity Analysis

- **Time:** The self-join scans the table three times, yielding O(n) where n is the number of rows.
- **Space:** Only a few extra references for the joined tables, O(1) auxiliary space.

## 5. Approach: Self-Join on 3 Consecutive IDs ✅

```sql
SELECT DISTINCT s1.*
FROM Stadium s1, Stadium s2, Stadium s3
WHERE s1.people >= 100 AND s2.people >= 100 AND s3.people >= 100
AND (
    (s1.id = s2.id - 1 AND s1.id = s3.id - 2) OR
    (s1.id = s2.id + 1 AND s1.id = s3.id - 1) OR
    (s1.id = s2.id + 1 AND s1.id = s3.id + 2)
)
ORDER BY s1.visit_date;
```

## Key Takeaway

> Self-join 3 copies of the table. Check all 3 positions a row could occupy in a consecutive triple (first, middle, last). All three must have ≥ 100 people.
