# 2985. Calculate Compressed Mean

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-compressed-mean](https://leetcode.com/problems/calculate-compressed-mean)
**Companies:** Google

---

## 1. Problem Description

Given a table with `item_id`, `value`, and `frequency`, calculate the mean of all values weighted by their frequencies. Round to 2 decimal places. *(SQL problem)*

---

## 2. Approach: Weighted Average — O(n) ✅

```sql
SELECT ROUND(SUM(value * frequency) / SUM(frequency), 2) AS mean
FROM compressed_data;
```

---

## Key Takeaway

> Weighted mean in SQL: `SUM(value * weight) / SUM(weight)` with `ROUND` for precision.
