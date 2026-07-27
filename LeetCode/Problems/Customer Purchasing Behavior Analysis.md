# 3230. Customer Purchasing Behavior Analysis

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customer-purchasing-behavior-analysis](https://leetcode.com/problems/customer-purchasing-behavior-analysis)
**Companies:** Amazon

---

## Problem Description

SQL: Analyze customer purchasing behavior by computing metrics like total spending, transaction count, unique categories, and a loyalty score. Rank customers by score.

---

## Approach

```sql
SELECT customer_id,
       SUM(amount) AS total_amount,
       COUNT(*) AS transaction_count,
       COUNT(DISTINCT category) AS unique_categories,
       ROUND(SUM(amount) / COUNT(*) * COUNT(DISTINCT category), 2) AS loyalty_score
FROM Transactions
GROUP BY customer_id
ORDER BY loyalty_score DESC, customer_id;
```

---

## Key Takeaway

> **Multi-metric customer analysis: combine SUM, COUNT, COUNT(DISTINCT) in a single GROUP BY, then compute derived scores from aggregated columns.**
