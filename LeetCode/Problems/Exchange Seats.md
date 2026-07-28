# 626. Exchange Seats

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/exchange-seats](https://leetcode.com/problems/exchange-seats)
**Companies:** Amazon, Bloomberg, Capgemini, Coindcx, Google, Meesho, Meta, Microsoft, Zomato

---

## Problem Description

Given a `Seat` table (id, student), swap every two consecutive students' seats. If the last student is odd-numbered, they stay in place.

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
Seat Table:
+----+----------+
| id | student  |
+----+----------+
| 1  | Alice    |
| 2  | Bob      |
| 3  | Charlie  |
| 4  | Diana    |
+----+----------+
```
**Result:**
```
+----+----------+
| id | student  |
+----+----------+
| 1  | Bob      |
| 2  | Alice    |
| 3  | Diana    |
| 4  | Charlie  |
+----+----------+
```

**Example 2 (odd count):**
```
Seat Table:
+----+----------+
| 1  | Alice    |
| 2  | Bob      |
| 3  | Charlie  |
+----+----------+
```
**Result:**
```
+----+----------+
| 1  | Bob      |
| 2  | Alice    |
| 3  | Charlie  |
+----+----------+
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
