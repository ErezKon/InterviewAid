# 1645. Hopper Company Queries II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/hopper-company-queries-ii](https://leetcode.com/problems/hopper-company-queries-ii)
**Companies:** Uber

---

## 1. Problem Description

For each month of 2020, report the percentage of working drivers (drivers who accepted at least one ride) out of all active drivers. (SQL problem)

## 2. Approach: Recursive CTE + Aggregation ✅

```sql
-- Generate months 1-12
-- Count cumulative active drivers per month
-- Count distinct drivers with accepted rides per month
-- working_percentage = working_drivers / active_drivers * 100
-- Handle division by zero (no active drivers → 0%)
```

## Key Takeaway

> Build on Hopper I: add distinct driver count per month for accepted rides, compute ratio. Handle months with zero active drivers.
