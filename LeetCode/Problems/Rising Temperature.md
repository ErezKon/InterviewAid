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

## Key Takeaway

> Self-join with `DATEDIFF = 1` connects each day to its predecessor — the standard SQL pattern for comparing consecutive rows by date.
