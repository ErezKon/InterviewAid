# 2394. Employees With Deductions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/employees-with-deductions](https://leetcode.com/problems/employees-with-deductions)
**Companies:** Amazon

---

## Problem Description
Given a list of employee records where each record contains `id`, `salary`, and a list of `deductions`, return a list of employee IDs whose net salary (salary minus sum of deductions) is **strictly less** than a given threshold `k`. Constraints: `1 <= number of employees <= 10^5`, salaries and deductions are non‑negative integers.

## Examples
- Input: `employees = [{id:1, salary:5000, deductions:[200,300]}, {id:2, salary:4000, deductions:[1000]}], k = 4500`
  Output: `[1]` // net salaries: 1→4500 (not less), 2→3000 (less than 4500) → return id 2.
- Input: `employees = [{id:3, salary:6000, deductions:[]}], k = 6000`
  Output: `[]` // net salary equals threshold, not included.

## Approach
Iterate through each employee, compute the sum of deductions, calculate net salary, and collect IDs where net < k.

```text
FUNCTION EmployeesWithDeductions(employees, k):
    SET result ← []
    FOR each emp IN employees:
        SET totalDeduction ← SUM(emp.deductions)
        SET netSalary ← emp.salary - totalDeduction
        IF netSalary < k:
            APPEND emp.id TO result
    RETURN result
```

## Walkthrough
| emp.id | salary | deductions | totalDeduction | netSalary | net < k? |
|---|---|---|---|---|---|
|1|5000|[200,300]|500|4500|false (equal) |
|2|4000|[1000]|1000|3000|true → add 2 |

Result `[2]`.

## Complexity Analysis
- **Time:** O(N + D) where N is number of employees and D total number of deductions (each visited once).
- **Space:** O(1) extra besides output list.

## Follow-Up Questions
1. How would you modify the solution to return employees whose net salary is within a range `[low, high]`?
2. Can you process the data in a streaming fashion if the employee list is too large to fit in memory?
3. How would you handle deductions that are percentages of salary instead of fixed amounts?

## Key Takeaway
A simple linear scan with aggregation suffices to filter employees based on net salary thresholds.
