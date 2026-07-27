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

## Key Takeaway

> Basic aggregation: join, group, sum, filter with HAVING. The pattern for "find entities where aggregate > threshold."
