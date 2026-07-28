# 1555. Bank Account Summary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bank-account-summary](https://leetcode.com/problems/bank-account-summary)
**Companies:** Optum

---

## 1. Problem Description

**SQL Problem.** Given `Users` (user_id, user_name, credit) and `Transactions` (trans_id, paid_by, paid_to, amount, transacted_on), compute each user's current credit and whether they are below the credit limit.

---

## 2. Examples

**Example 1:**
```
Users = [[1, "Alice", 100], [2, "Bob", 200]]
Transactions = [[101, 1, 2, 50, "2023-01-01"], [102, 2, 1, 30, "2023-01-02"]]
```
**Output:**
```
[[1, "Alice", 80, "No"], [2, "Bob", 220, "No"]]
```
*Explanation:* Alice paid 50 and received 30, net credit = 100 - 50 + 30 = 80. Bob net credit = 200 - 30 + 50 = 220.

**Example 2:**
```
Users = [[3, "Charlie", 0]]
Transactions = []
```
**Output:**
```
[[3, "Charlie", 0, "Yes"]]
```
*Explanation:* No transactions, credit remains 0 which is below the limit.

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

## 3. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Left join Users with Transactions on `user_id` being either `paid_by` or `paid_to`. | Each user paired with relevant rows.
| 2 | Compute debit sum: `SUM(CASE WHEN t.paid_by = u.user_id THEN t.amount ELSE 0 END)`. | Total amount user paid.
| 3 | Compute credit sum: `SUM(CASE WHEN t.paid_to = u.user_id THEN t.amount ELSE 0 END)`. | Total amount user received.
| 4 | Net credit = `u.credit - debit + credit`. | Updated balance.
| 5 | Flag if net credit < 0. | `credit_limit_breached` column.

---

## 4. Complexity Analysis

- **Time:** O(N + M) where N = number of users, M = number of transactions (single pass aggregation).
- **Space:** O(N) for the result set; no additional auxiliary structures.

---

## 5. Follow-Up Questions

- How would you handle multiple credit limits per user stored in a separate table?
- Extend the query to list users whose credit limit was breached in the last 30 days.
- Can you rewrite the solution using window functions instead of aggregation?

---

## Key Takeaway

> Track debits (paid_by) and credits (paid_to) separately using CASE WHEN inside SUM. COALESCE handles users with no transactions.
