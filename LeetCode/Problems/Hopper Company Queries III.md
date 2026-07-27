# 1651. Hopper Company Queries III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/hopper-company-queries-iii](https://leetcode.com/problems/hopper-company-queries-iii)
**Companies:** Uber

---

## 1. Problem Description

For each month of 2020 (1-10), report the 3-month moving average of ride distance and ride duration. (SQL problem)

## 2. Approach: Recursive CTE + Window AVG ✅

```sql
-- Generate months 1-12, compute per-month totals
-- Use AVG() OVER (ORDER BY month ROWS BETWEEN CURRENT AND 2 FOLLOWING)
-- Report months 1-10 only (each has a full 3-month window)
```

## Key Takeaway

> Compute monthly aggregates, then apply a 3-month moving average window function. Only output months 1-10 for complete windows.
