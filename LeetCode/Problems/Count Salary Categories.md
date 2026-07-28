# 1907. Count Salary Categories

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-salary-categories](https://leetcode.com/problems/count-salary-categories)
**Companies:** Amazon, Bloomberg, Epam Systems, Microsoft, Pornhub

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a table `Accounts` with columns `account_id` and `income`, categorize each account into:
- **"Low Salary"**: income < 20000
- **"Average Salary"**: 20000 ≤ income ≤ 50000
- **"High Salary"**: income > 50000

Return the count of accounts in each category. All three categories must appear even if the count is 0.

---

## Examples

**Example 1:**
```sql
Accounts
+------------+--------+
| account_id | income |
+------------+--------+
| 1          | 15000  |
| 2          | 30000  |
| 3          | 70000  |
+------------+--------+
```
**Output:**
```
Low Salary      1
Average Salary  1
High Salary     1
```

**Example 2 (category with zero count):**
```sql
Accounts
+------------+--------+
| account_id | income |
+------------+--------+
| 1          | 12000  |
| 2          | 18000  |
+------------+--------+
```
**Output:**
```
Low Salary      2
Average Salary  0
High Salary     0
```

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

## Walkthrough

1. **First SELECT** counts rows where `income < 20000`. The `CASE` returns `1` for matching rows, otherwise `NULL`; `COUNT` ignores `NULL`.
2. **Second SELECT** counts rows with `20000 ≤ income ≤ 50000` using `BETWEEN`.
3. **Third SELECT** counts rows where `income > 50000`.
4. `UNION ALL` concatenates the three single‑row results, preserving rows even when a count is `0`.
5. The final output lists each category with its respective count.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — three passes (or one pass with optimizer) |
| **Space** | O(1) — constant output rows |

---

## Follow-Up Questions

1. How would you modify the query to also return the average income per category?
2. Can you write a single‑pass solution using `GROUP BY` while still showing zero‑count categories?
3. How would you handle a large `Accounts` table efficiently (e.g., using indexes)?

---

## Key Takeaway

> **When the output must include all categories (even empty ones), use `UNION ALL` with conditional aggregation rather than `GROUP BY`, which omits groups with no matching rows.**