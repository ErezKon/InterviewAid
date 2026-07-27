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

## 3. Key Takeaway

> Running sum via `SUM() OVER (ORDER BY turn)`, filter ≤ 1000, take the last valid row.
