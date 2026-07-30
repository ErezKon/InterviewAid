# 607. Sales Person

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-person](https://leetcode.com/problems/sales-person)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Report salespeople who have **no orders** with the company named "RED".

---

## Approach

```sql
SELECT name FROM SalesPerson
WHERE sales_id NOT IN (
    SELECT o.sales_id FROM Orders o
    JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
);
```

---

## Examples

**Example 1:**
- `SalesPerson` contains Alice (sales_id 1) and Bob (sales_id 2).
- `Orders` links Alice to company "BLUE" and Bob to company "RED".
- **Output:** `Alice` (only salesperson without a RED order).

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Subquery selects sales_id of orders linked to company RED | {2} |
| 2 | Main query selects names where sales_id NOT IN {2} | {Alice} |
| 3 | Return the names | Alice |

---

## Complexity Analysis

- **Time:** O(N + M) where N is number of rows in `SalesPerson` and M is number of rows in `Orders` (join and subquery scans each row once).
- **Space:** O(K) for storing intermediate sales_id set from the subquery, K ≤ M.

---

## Key Takeaway

> `NOT IN (subquery)` is the clean pattern for "exclude entities related to a specific condition." Alternative: `NOT EXISTS` or `LEFT JOIN ... IS NULL`.
