# 1445. Apples & Oranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apples-oranges](https://leetcode.com/problems/apples-oranges)
**Companies:** Meta

---

## 1. Problem Description

Given a `Sales` table with `sale_date`, `fruit` (`'apples'` or `'oranges'`), and `sold_num`, report the difference (apples - oranges) sold on each date. *(SQL problem)*

---

## 2. Approach: Conditional Aggregation — O(n) ✅

```sql
SELECT sale_date,
       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date
ORDER BY sale_date;
```

---

## Key Takeaway

> Use `CASE` inside `SUM` to pivot two categories into a single aggregated difference per group.
