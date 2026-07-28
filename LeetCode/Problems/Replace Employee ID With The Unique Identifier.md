# 1378. Replace Employee ID With The Unique Identifier

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier](https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft, Point72, Tcs

---

## Problem Description
Given two tables `Employees(id, name)` and `EmployeeUNI(id, unique_id)`, return each employee's name together with their unique identifier. If an employee does not have a corresponding entry in `EmployeeUNI`, the `unique_id` should be `NULL`.

## Examples
- **Input Tables**:
  - Employees: `[(1, "Alice"), (2, "Bob"), (3, "Carol")]`
  - EmployeeUNI: `[(1, 1001), (3, 1003)]`
  - **Output**: `[("Alice", 1001), ("Bob", NULL), ("Carol", 1003)]`
- **Explanation**: Bob has no entry in `EmployeeUNI`, so his unique identifier is `NULL`.

## Approach
Perform a left join from `Employees` to `EmployeeUNI` on the `id` column, selecting the employee name and the unique identifier.

```text
FUNCTION GetEmployeeUniqueIds():
    // Retrieve employee name and unique identifier using left join
    SELECT e.name, eu.unique_id
    FROM Employees e
    LEFT JOIN EmployeeUNI eu ON e.id = eu.id;
```

## Walkthrough
| Step | Operation | Resulting Row |
|------|-----------|---------------|
| 1 | Left join on `id=1` | ("Alice", 1001) |
| 2 | Left join on `id=2` | ("Bob", NULL) |
| 3 | Left join on `id=3` | ("Carol", 1003) |

## Complexity Analysis
- Time: O(N) where N is the number of rows in `Employees` (assuming indexed join).
- Space: O(N) for the result set.

## Follow‑Up Questions
1. How would you handle duplicate `id` values in either table?
2. How to return only employees that have a unique identifier?
3. How to update the `EmployeeUNI` table to add missing identifiers?

## Key Takeaway
A left join lets you keep all rows from the primary table while optionally attaching matching data from a secondary table.
