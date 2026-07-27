# 1084. Sales Analysis III

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-analysis-iii](https://leetcode.com/problems/sales-analysis-iii)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Report products that were **only** sold in Q1 2019 (Jan 1 – Mar 31). A product qualifies if ALL its sales fall within this range.

---

## Approach

```sql
SELECT p.product_id, p.product_name
FROM Product p JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';
```

---

## Key Takeaway

> `HAVING MIN(date) >= start AND MAX(date) <= end` ensures **all** sales fall within the range — an elegant pattern for "exclusively within a period" queries.
