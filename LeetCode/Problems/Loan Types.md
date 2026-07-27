# 2990. Loan Types

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/loan-types](https://leetcode.com/problems/loan-types)
**Companies:** Google

---

## 1. Problem Description

(SQL) Find users who have both a "Refinance" and a "Mortgage" loan type.

---

## 2. Approach: GROUP BY + HAVING with conditional aggregation

```sql
SELECT user_id
FROM Loans
WHERE loan_type IN ('Refinance', 'Mortgage')
GROUP BY user_id
HAVING COUNT(DISTINCT loan_type) = 2
ORDER BY user_id;
```

---

## 3. Key Takeaway

> Filter to relevant loan types, group by user, and use `HAVING COUNT(DISTINCT) = 2` to ensure both types exist.
