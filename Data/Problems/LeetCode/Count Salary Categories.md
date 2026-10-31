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

Table: `Accounts`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| account_id  | int  |
| income      | int  |
+-------------+------+
account_id is the primary key (column with unique values) for this table.
Each row contains information about the monthly income for one bank account.
```

Write a solution to calculate the number of bank accounts for each salary category. The salary categories are:

- `"Low Salary"`: All the salaries **strictly less** than `$20000`.
- `"Average Salary"`: All the salaries in the **inclusive** range `[$20000, $50000]`.
- `"High Salary"`: All the salaries **strictly greater** than `$50000`.

The result table **must** contain all three categories. If there are no accounts in a category, return `0`.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
Accounts table:
+------------+--------+
| account_id | income |
+------------+--------+
| 3          | 108939 |
| 2          | 12747  |
| 8          | 87709  |
| 6          | 91796  |
+------------+--------+
Output:
+----------------+----------------+
| category       | accounts_count |
+----------------+----------------+
| Low Salary     | 1              |
| Average Salary | 0              |
| High Salary    | 3              |
+----------------+----------------+
Explanation:
Low Salary: Account 2.
Average Salary: No accounts.
High Salary: Accounts 3, 6, and 8.
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
4. `UNION ALL` concatenates the three single-row results, preserving rows even when a count is `0`.
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
2. Can you write a single-pass solution using `GROUP BY` while still showing zero-count categories?
3. How would you handle a large `Accounts` table efficiently (e.g., using indexes)?

---

## Key Takeaway

> **When the output must include all categories (even empty ones), use `UNION ALL` with conditional aggregation rather than `GROUP BY`, which omits groups with no matching rows.**