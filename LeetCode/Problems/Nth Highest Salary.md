# 177. Nth Highest Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nth-highest-salary](https://leetcode.com/problems/nth-highest-salary)
**Companies:** Accenture, Amazon, Atlassian, Bloomberg, Deloitte, Google, Meta, Microsoft, Zs Associates

---

## Problem Description
Given an `Employee` table with columns `id`, `name`, and `salary`, write a query to find the **N-th highest salary**. If such a salary does not exist, return `NULL`.

## Examples
| N | Result |
|---|--------|
| 1 | Highest salary (e.g., 5000) |
| 2 | Second highest salary (e.g., 4000) |
| 3 | Third highest salary (e.g., 3000) |

## Approach
**Algorithm:** Use `ORDER BY salary DESC` with `LIMIT` and `OFFSET` to skip the first `N-1` distinct salaries.

```text
FUNCTION getNthHighestSalary(N):
    SET offset ← N - 1
    RETURN (
        SELECT DISTINCT salary FROM Employee
        ORDER BY salary DESC
        LIMIT 1 OFFSET offset
    )
```

## Walkthrough
For `N = 2`:
1. Retrieve distinct salaries sorted descending: `[5000, 4000, 3000, ...]`.
2. `OFFSET = 1` skips the first salary (5000).
3. `LIMIT 1` returns the next salary → `4000`.
If the table has fewer than `N` distinct salaries, the query returns `NULL`.

## Complexity Analysis
- **Time:** O(M log M) where M is the number of rows (due to sorting).
- **Space:** O(M) for the intermediate distinct salary list.

## Follow‑Up Questions
- How would you implement this without using `LIMIT`/`OFFSET`?
- Can you solve it in a single pass using window functions?
- How to handle ties when multiple employees share the same salary?

## Key Takeaway
Sorting distinct salaries and offsetting by `N-1` yields the N‑th highest salary directly.
