# 1555. Bank Account Summary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bank-account-summary](https://leetcode.com/problems/bank-account-summary)
**Companies:** Optum

---

## 1. Problem Description

**SQL Problem.** Given `Users` (user_id, user_name, credit) and `Transactions` (trans_id, paid_by, paid_to, amount, transacted_on), compute each user's current credit and whether they are below the credit limit.

---

## 2. Approach: Left Join + Aggregation ✅

```sql
SELECT u.user_id, u.user_name,
       u.credit - COALESCE(SUM(CASE WHEN t.paid_by = u.user_id THEN t.amount ELSE 0 END), 0)
                + COALESCE(SUM(CASE WHEN t.paid_to = u.user_id THEN t.amount ELSE 0 END), 0) AS credit,
       CASE WHEN (u.credit - ...) < 0 THEN 'Yes' ELSE 'No' END AS credit_limit_breached
FROM Users u
LEFT JOIN Transactions t ON u.user_id IN (t.paid_by, t.paid_to)
GROUP BY u.user_id, u.user_name, u.credit;
```

---

## Key Takeaway

> Track debits (paid_by) and credits (paid_to) separately using CASE WHEN inside SUM. COALESCE handles users with no transactions.
