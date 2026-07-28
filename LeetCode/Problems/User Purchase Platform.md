# 1127. User Purchase Platform

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/user-purchase-platform](https://leetcode.com/problems/user-purchase-platform)
**Companies:** Linkedin

---

## Problem Description
Given a table `Purchase(user_id INT, purchase_date DATE, amount DECIMAL)`, design a query to compute for each user the total amount spent, the number of purchases, and the average purchase amount over the entire history. Additionally, return the most recent purchase date for each user.

## Examples
| user_id | total_spent | purchase_count | avg_amount | last_purchase |
|---------|-------------|----------------|------------|---------------|
| 1       | 250.00      | 3              | 83.33      | 2022-12-15    |
| 2       | 120.00      | 2              | 60.00      | 2022-11-30    |
*Each row aggregates a user's purchase history.*

## Approach
Use aggregation functions (`SUM`, `COUNT`, `AVG`, `MAX`) grouped by `user_id` to compute the required metrics in a single query.

```text
FUNCTION UserPurchaseMetrics(purchaseTable):
    SELECT user_id,
           SUM(amount) AS total_spent,
           COUNT(*) AS purchase_count,
           AVG(amount) AS avg_amount,
           MAX(purchase_date) AS last_purchase
    FROM purchaseTable
    GROUP BY user_id
    ORDER BY user_id ASC
    RETURN result
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Scan all rows of `Purchase`. |
| 2 | Group rows by `user_id`. |
| 3 | For each group compute `SUM(amount)`, `COUNT(*)`, `AVG(amount)`, and `MAX(purchase_date)`. |
| 4 | Output a row per user with the aggregated values. |

## Complexity Analysis
- **Time:** O(N) where N is the number of purchase records (single pass with grouping). Index on `user_id` can improve grouping performance.
- **Space:** O(U) for storing results, where U is the number of distinct users.

## Follow-Up Questions
1. How would you include only purchases within the last year?
2. Extend the query to compute the median purchase amount per user.
3. Design a solution that updates these aggregates incrementally as new purchases arrive.

## Key Takeaway
SQL aggregation (`SUM`, `COUNT`, `AVG`, `MAX`) with `GROUP BY` efficiently summarizes per‑user purchase statistics in a single pass.
