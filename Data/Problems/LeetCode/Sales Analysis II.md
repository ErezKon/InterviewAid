# 1083. Sales Analysis II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-analysis-ii](https://leetcode.com/problems/sales-analysis-ii)
**Companies:** Amazon

---

## Problem Description

Report buyers who bought S8 but not iPhone. Uses `Product` and `Sales` tables.

---

## Approach

```sql
SELECT DISTINCT s.buyer_id
FROM Sales s JOIN Product p ON s.product_id = p.product_id
WHERE p.product_name = 'S8'
  AND s.buyer_id NOT IN (
      SELECT s2.buyer_id FROM Sales s2 JOIN Product p2 ON s2.product_id = p2.product_id
      WHERE p2.product_name = 'iPhone'
  );
```

---

## Examples

**Example 1:**
- `Product` table contains rows for "S8" and "iPhone".
- `Sales` table shows buyer 101 purchased S8, buyer 102 purchased both S8 and iPhone.
- **Output:** `101` (buyer who bought S8 but not iPhone).

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Select buyers of S8 | {101, 102} |
| 2 | Select buyers of iPhone | {102} |
| 3 | Subtract iPhone buyers from S8 buyers | {101} |
| 4 | Return distinct buyer IDs | 101 |

---

## Complexity Analysis

- **Time:** O(N) where N is the number of rows in `Sales` (joins and subquery scans each row once).
- **Space:** O(K) for storing intermediate buyer IDs, K ≤ N.

---

## Key Takeaway

> "Bought X but not Y" → select buyers of X then exclude those who also bought Y via `NOT IN` subquery or `LEFT JOIN ... IS NULL`.
