# 1907. Count Salary Categories

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-salary-categories](https://leetcode.com/problems/count-salary-categories)
**Companies:** Amazon, Bloomberg, Epam Systems, Microsoft, Pornhub

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a table `Accounts` with columns `account_id` and `income`, categorize each account into:
- **"Low Salary"**: income < 20000
- **"Average Salary"**: 20000 ≤ income ≤ 50000
- **"High Salary"**: income > 50000

Return the count of accounts in each category. All three categories must appear even if the count is 0.

---

## Key Insight

Use `UNION ALL` with conditional `COUNT(CASE WHEN ...)` to guarantee all three rows appear in the result. A simple `GROUP BY` on a CASE expression would omit categories with zero accounts.

---

## Approach

```sql
SELECT 'Low Salary' AS category,
    COUNT(CASE WHEN income < 20000 THEN 1 END) AS accounts_count FROM Accounts
UNION ALL
SELECT 'Average Salary',
    COUNT(CASE WHEN income BETWEEN 20000 AND 50000 THEN 1 END) FROM Accounts
UNION ALL
SELECT 'High Salary',
    COUNT(CASE WHEN income > 50000 THEN 1 END) FROM Accounts;
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — three passes (or one pass with optimizer) |
| **Space** | O(1) — constant output rows |

---

## Key Takeaway

> **When the output must include all categories (even empty ones), use `UNION ALL` with conditional aggregation rather than `GROUP BY`, which omits groups with no matching rows.**
