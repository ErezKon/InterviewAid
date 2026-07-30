# 176. Second Highest Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/second-highest-salary](https://leetcode.com/problems/second-highest-salary)
**Companies:** Accenture, Amazon, Apple, Barclays, Bloomberg, Capgemini, Cognizant, Deloitte, Google, Hcl, Infosys, Lti, Meesho, Meta, Microsoft, Oracle, Tcs, Zs Associates

---

## Problem Description

Return the **second highest** distinct salary from the `Employee` table. If none exists, return `null`.

---

## Examples

| Employees Table | Query Result |
|-----------------|--------------|
| `[(1, 'Alice', 100), (2, 'Bob', 200), (3, 'Carol', 300)]` | `200` |
| `[(1, 'Dave', 500)]` | `null` |
| `[(1, 'Eve', 400), (2, 'Frank', 400), (3, 'Grace', 300)]` | `300` |

---

## Approach

The goal is to find the second highest distinct salary. Two common SQL strategies:
1. **Sub‑query with MAX:** Find the maximum salary, then select the maximum salary that is less than this value.
2. **Window Function (DENSE_RANK):** Rank salaries in descending order and pick the one with rank 2.

Both approaches automatically ignore duplicate salaries because they operate on distinct values.

---

## Walkthrough

**Using the sub‑query method:**
1. Compute `MAX(salary)` → highest salary.
2. In the outer query, filter rows where `salary` is less than this maximum.
3. Apply `MAX` again to obtain the largest salary among the filtered rows, which is the second highest.

**Using DENSE_RANK:**
1. Apply `DENSE_RANK() OVER (ORDER BY salary DESC)` to assign ranks, treating equal salaries as the same rank.
2. Select the row where rank equals 2.
3. Use `LIMIT 1` to return a single value (or `NULL` if none).

---

## Complexity Analysis

- **Time Complexity:** Both queries scan the `Employee` table once, yielding `O(n)` where `n` is the number of rows.
- **Space Complexity:** Only constant extra space is used for aggregation and ranking, i.e., `O(1)` auxiliary space.

---

## Follow‑Up Questions

1. How would you retrieve the *k*‑th highest salary?
2. How can you modify the query to return the top k distinct salaries?
3. How would you handle ties when the requirement is to return the second highest *unique* salary versus the second highest *row*?

---

## Key Takeaway

> Use a sub‑query or `DENSE_RANK` window function to efficiently obtain the second highest distinct salary without manual sorting.
