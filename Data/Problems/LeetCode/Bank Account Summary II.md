# 1587. Bank Account Summary II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/bank-account-summary-ii](https://leetcode.com/problems/bank-account-summary-ii)
**Companies:** Google

---

## 1. Problem Description

**SQL Problem.** Given `Users` and `Transactions` tables, find users whose total balance exceeds 10000.

---

## 2. Approach: JOIN + GROUP BY + HAVING ✅

```sql
SELECT u.name, SUM(t.amount) AS balance
FROM Users u
JOIN Transactions t ON u.account = t.account
GROUP BY u.name
HAVING SUM(t.amount) > 10000;
```

---

## 3. Examples

| Users table | Transactions table | Result |
|-------------|-------------------|--------|
| `('Alice', 'A1')`<br>`('Bob', 'B2')` | `('T1','A1',5000)`<br>`('T2','A1',6000)`<br>`('T3','B2',3000)` | `Alice` (balance 11000) |
| `('Carol','C3')` | `('T4','C3',9000)` | *(no row)* |

*Explanation*: Alice’s total transaction amount is 5000+6000=11000 > 10000, so she appears in the result.

---

## 4. Walkthrough

1. **JOIN** `Users` with `Transactions` on the account field, producing rows pairing each user with each of their transactions.
2. **GROUP BY** the user name to aggregate all amounts per user.
3. **HAVING** filters groups where the summed amount exceeds 10000.
4. The query returns the qualifying user names and their balances.

---

## 5. Complexity Analysis

- **Time:** The join and aggregation are linear in the number of rows, `O(U + T)` where `U` and `T` are the sizes of the tables.
- **Space:** Additional space for the hash map of aggregates, `O(U)`.

---

## 6. Follow‑Up Questions

1. How would you modify the query to return users whose balance is **between** two thresholds?
2. How can you handle cases where a user has no transactions?
3. How would you compute the balance per user **per month**?

---

## Key Takeaway

> Use a `JOIN` to associate users with their transactions, `GROUP BY` to aggregate, and `HAVING` to filter on the aggregated value.
