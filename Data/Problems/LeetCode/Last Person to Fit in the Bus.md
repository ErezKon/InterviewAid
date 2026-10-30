# 1204. Last Person to Fit in the Bus

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/last-person-to-fit-in-the-bus](https://leetcode.com/problems/last-person-to-fit-in-the-bus)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Wayfair

---

## 1. Problem Description

Table: `Queue`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| person_id   | int     |
| person_name | varchar |
| weight      | int     |
| turn        | int     |
+-------------+---------+
person_id column contains unique values.
This table has the information about all people waiting for a bus.
The person_id and turn columns will contain all numbers from 1 to n, where n is the number of rows in the table.
turn determines the order of which the people will board the bus, where turn=1 denotes the first person to board and turn=n denotes the last person to board.
weight is the weight of the person in kilograms.
```

There is a queue of people waiting to board a bus. However, the bus has a weight limit of `1000` **kilograms**, so there may be some people who cannot board.

Write a solution to find the `person_name` of the **last person** that can fit on the bus without exceeding the weight limit. The test cases are generated such that the first person does not exceed the weight limit.

**Note** that *only one* person can board the bus at any given turn.

The result format is in the following example.

---

## 2. Approach: Window Function — Running Total

```sql
SELECT person_name
FROM (
    SELECT person_name, SUM(weight) OVER (ORDER BY turn) AS running_total
    FROM Queue
) t
WHERE running_total <= 1000
ORDER BY running_total DESC
LIMIT 1;
```

---

## Examples

```
Example 1:
  Input:
  Queue table:
  +-----------+-------------+--------+------+
  | person_id | person_name | weight | turn |
  +-----------+-------------+--------+------+
  | 5         | Alice       | 250    | 1    |
  | 4         | Bob         | 175    | 5    |
  | 3         | Alex        | 350    | 2    |
  | 6         | John Cena   | 400    | 3    |
  | 1         | Winston     | 500    | 6    |
  | 2         | Marie       | 200    | 4    |
  +-----------+-------------+--------+------+
  Output:
  +-------------+
  | person_name |
  +-------------+
  | John Cena   |
  +-------------+
  Explanation: The folowing table is ordered by the turn for simplicity.
  +------+----+-----------+--------+--------------+
  | Turn | ID | Name      | Weight | Total Weight |
  +------+----+-----------+--------+--------------+
  | 1    | 5  | Alice     | 250    | 250          |
  | 2    | 3  | Alex      | 350    | 600          |
  | 3    | 6  | John Cena | 400    | 1000         | (last person to board)
  | 4    | 2  | Marie     | 200    | 1200         | (cannot board)
  | 5    | 4  | Bob       | 175    | ___          |
  | 6    | 1  | Winston   | 500    | ___          |
  +------+----+-----------+--------+--------------+
```

---

## Walkthrough

1. Compute running total of weights ordered by `turn` using `SUM() OVER`.
2. Filter rows where `running_total` ≤ 1000.
3. Order the filtered rows by `running_total` descending to get the last valid person.
4. `LIMIT 1` returns that person’s name.

---

## Complexity Analysis

The window function scans the table once: **O(n)** time and **O(1)** additional space (aside from result set).

---

## Follow-Up Questions

- How would you modify the query for a different weight limit?
- How to handle ties when multiple people have the same running total?
- Can you compute the list of all people who fit, not just the last one?

---

## Key Takeaway

> Running sum via `SUM() OVER (ORDER BY turn)`, filter ≤ 1000, take the last valid row.
