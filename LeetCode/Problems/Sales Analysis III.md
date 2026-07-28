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

## Examples

**Example 1:**
- Product A has sales on 2019-01-15 and 2019-03-20 → included.
- Product B has a sale on 2019-04-05 → excluded.
- **Output:** Product A.

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Join Product and Sales | rows with product‑sale pairs |
| 2 | Group by product | aggregates per product |
| 3 | Apply HAVING clause to keep only products where MIN(date) ≥ start and MAX(date) ≤ end | filtered set |
| 4 | Return product IDs and names | desired output |

---

## Complexity Analysis

- **Time:** O(N) where N is the number of rows in `Sales` (single pass for aggregation).
- **Space:** O(P) for storing aggregates per product, P ≤ N.

---

## Key Takeaway

> `HAVING MIN(date) >= start AND MAX(date) <= end` ensures **all** sales of a product lie within a period.
