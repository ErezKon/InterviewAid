# 2985. Calculate Compressed Mean

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-compressed-mean](https://leetcode.com/problems/calculate-compressed-mean)
**Companies:** Google

---

## 1. Problem Description

Given a table with `item_id`, `value`, and `frequency`, calculate the mean of all values weighted by their frequencies. Round the result to 2 decimal places. *(SQL problem)*

---

## Examples

| item_id | value | frequency |
|---------|-------|-----------|
| 1       | 10    | 2         |
| 2       | 20    | 3         |
| 3       | 30    | 5         |

**Output:** `24.00`

*Explanation:* Weighted sum = 10*2 + 20*3 + 30*5 = 200; total frequency = 2+3+5 = 10; mean = 200/10 = 20.00 (rounded to 2 decimals).

---

## 2. Approach: Weighted Average — O(n) ✅

```sql
SELECT ROUND(SUM(value * frequency) / SUM(frequency), 2) AS mean
FROM compressed_data;
```

---

## Walkthrough

1. **Compute weighted sum:** `SUM(value * frequency)` aggregates each row's contribution.
2. **Compute total weight:** `SUM(frequency)` adds up all frequencies.
3. **Divide:** Weighted sum divided by total weight yields the mean.
4. **Round:** `ROUND(..., 2)` formats the result to two decimal places.

For the example table:
- Weighted sum = 10*2 + 20*3 + 30*5 = 200
- Total weight = 2 + 3 + 5 = 10
- Mean = 200 / 10 = 20.00 → rounded to `20.00`.

---

## Complexity Analysis

- **Time:** O(n) – each row is processed once by the aggregation functions.
- **Space:** O(1) – only constant‑size aggregates are stored.

---

## Follow-Up Questions

1. How would you compute the weighted median instead of the mean?
2. How can you handle extremely large tables where intermediate sums might overflow?
3. Extend the query to filter rows based on a condition (e.g., `value > 15`).

---

## Key Takeaway

> Weighted mean in SQL is obtained by `SUM(value * weight) / SUM(weight)` and rounded as needed.
