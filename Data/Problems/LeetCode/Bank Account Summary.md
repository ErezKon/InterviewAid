# 1555. Bank Account Summary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bank-account-summary](https://leetcode.com/problems/bank-account-summary)
**Companies:** Optum

---

## 1. Problem Description

Table: `Users`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| user_id      | int     |
| user_name    | varchar |
| credit       | int     |
+--------------+---------+
user_id is the primary key (column with unique values) for this table.
Each row of this table contains the current credit information for each user.
```

Table: `Transactions`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| trans_id      | int     |
| paid_by       | int     |
| paid_to       | int     |
| amount        | int     |
| transacted_on | date    |
+---------------+---------+
trans_id is the primary key (column with unique values) for this table.
Each row of this table contains information about the transaction in the bank.
User with id (paid_by) transfer money to user with id (paid_to).
```

Leetcode Bank (LCB) helps its coders in making virtual payments. Our bank records all transactions in the table *Transaction*, we want to find out the current balance of all users and check whether they have breached their credit limit (If their current credit is less than `0`).

Write a solution to report.

- `user_id`,
- `user_name`,
- `credit`, current balance after performing transactions, and
- `credit_limit_breached`, check credit_limit (`"Yes"` or `"No"`)

Return the result table in **any** order.

---

## 2. Examples

```
Example 1:
  Input:
  Users table:
  +------------+--------------+-------------+
  | user_id    | user_name    | credit      |
  +------------+--------------+-------------+
  | 1          | Moustafa     | 100         |
  | 2          | Jonathan     | 200         |
  | 3          | Winston      | 10000       |
  | 4          | Luis         | 800         |
  +------------+--------------+-------------+
  Transactions table:
  +------------+------------+------------+----------+---------------+
  | trans_id   | paid_by    | paid_to    | amount   | transacted_on |
  +------------+------------+------------+----------+---------------+
  | 1          | 1          | 3          | 400      | 2020-08-01    |
  | 2          | 3          | 2          | 500      | 2020-08-02    |
  | 3          | 2          | 1          | 200      | 2020-08-03    |
  +------------+------------+------------+----------+---------------+
  Output:
  +------------+------------+------------+-----------------------+
  | user_id    | user_name  | credit     | credit_limit_breached |
  +------------+------------+------------+-----------------------+
  | 1          | Moustafa   | -100       | Yes                   |
  | 2          | Jonathan   | 500        | No                    |
  | 3          | Winston    | 9900       | No                    |
  | 4          | Luis       | 800        | No                    |
  +------------+------------+------------+-----------------------+
  Explanation:
  Moustafa paid $400 on "2020-08-01" and received $200 on "2020-08-03", credit (100 -400 +200) = -$100
  Jonathan received $500 on "2020-08-02" and paid $200 on "2020-08-03", credit (200 +500 -200) = $500
  Winston received $400 on "2020-08-01" and paid $500 on "2020-08-02", credit (10000 +400 -500) = $9900
  Luis did not received any transfer, credit = $800
```

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
