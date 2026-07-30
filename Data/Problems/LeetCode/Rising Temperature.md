# 197. Rising Temperature

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rising-temperature](https://leetcode.com/problems/rising-temperature)
**Companies:** Accenture, Amazon, Bloomberg, Cisco, Cognizant, Deloitte, Fractal Analytics, Google, Meesho, Meta, Microsoft, Walmart Labs

---

## Problem Description

Given a `Weather` table with `id`, `recordDate`, `temperature`, find all IDs where the temperature is **higher than the previous day**.

---

## Approach

```sql
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;
```

---

## Examples

| id | recordDate | temperature |
|----|------------|-------------|
| 1  | 2023-01-01 | 10 |
| 2  | 2023-01-02 | 12 |
| 3  | 2023-01-03 | 11 |

**Output:** `[2]` – only the second day is hotter than the previous day.

---

## Walkthrough

1. Self‑join the table on `recordDate` offset by one day.
2. Compare `w1.temperature` with `w2.temperature`.
3. Return `w1.id` where the condition holds.

---

## Complexity Analysis

- **Time:** O(n) – each row participates in at most one join.
- **Space:** O(1) extra beyond the input table.

---

## Follow-Up Questions

- How would you modify the query to find days with a temperature drop?
- How to handle missing dates in the dataset?
- Can you compute the longest streak of rising temperatures?

---

## Key Takeaway

> Self‑join with `DATEDIFF = 1` connects each day to its predecessor — the standard SQL pattern for comparing consecutive rows by date.
