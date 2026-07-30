# 1204. Last Person to Fit in the Bus

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/last-person-to-fit-in-the-bus](https://leetcode.com/problems/last-person-to-fit-in-the-bus)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Wayfair

---

## 1. Problem Description

(SQL) Find the last person who can board the bus without exceeding the 1000 kg weight limit.

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

| turn | person_name | weight |
|------|-------------|--------|
| 1    | Alice       | 200    |
| 2    | Bob         | 300    |
| 3    | Charlie     | 400    |
| 4    | Diana       | 250    |

Running totals: 200, 500, 900, 1150. The last person fitting within 1000 kg is **Charlie**.

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
