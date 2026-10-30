# 626. Exchange Seats

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/exchange-seats](https://leetcode.com/problems/exchange-seats)
**Companies:** Amazon, Bloomberg, Capgemini, Coindcx, Google, Meesho, Meta, Microsoft, Zomato

---

## Problem Description

Table: `Seat`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| student     | varchar |
+-------------+---------+
id is the primary key (unique value) column for this table.
Each row of this table indicates the name and the ID of a student.
The ID sequence always starts from 1 and increments continuously.
```

Write a solution to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.

Return the result table ordered by `id` **in ascending order**.

The result format is in the following example.

---

## Key Insight

> Odd id → swap with next (id+1). Even id → swap with previous (id-1). Special case: last student with odd id stays put. Use `CASE WHEN` to reassign ids.

---

## Approach: CASE Expression

```sql
SELECT
    CASE
        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id;
```

---

## Examples

**Example 1:**
```
Input:
Seat table:
+----+---------+
| id | student |
+----+---------+
| 1  | Abbot   |
| 2  | Doris   |
| 3  | Emerson |
| 4  | Green   |
| 5  | Jeames  |
+----+---------+
Output:
+----+---------+
| id | student |
+----+---------+
| 1  | Doris   |
| 2  | Abbot   |
| 3  | Green   |
| 4  | Emerson |
| 5  | Jeames  |
+----+---------+
Explanation:
Note that if the number of students is odd, there is no need to change the last one's seat.
```

---

## Walkthrough

| Step | id | Condition | New id |
|------|----|-----------|--------|
| 1 | 1 (odd, not max) | `id % 2 = 1` → `id + 1` | 2 |
| 2 | 2 (even) | else → `id - 1` | 1 |
| 3 | 3 (odd, max) | stays 3 | 3 |
| 4 | 4 (even) | `id - 1` | 3 |
| 5 | 3 (odd, not max) | `id + 1` | 4 |

Resulting ordering after `ORDER BY new id` yields swapped pairs.

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| SELECT with CASE | O(n) where n is number of rows | O(1) additional |

---

## Key Takeaway

> **Swap adjacent pairs with `CASE`: odd→id+1, even→id-1, last odd→stays. Re-order by new id for correct output.**
