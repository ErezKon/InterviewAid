# 2879. Display the First Three Rows

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/display-the-first-three-rows](https://leetcode.com/problems/display-the-first-three-rows)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

DataFrame: `employees`

```
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| employee_id | int    |
| name        | object |
| department  | object |
| salary      | int    |
+-------------+--------+
```

Write a solution to display the **first** `3` rows of this DataFrame.

---

## Approach: Pandas head() ✅

```text
FUNCTION selectFirstRows(employees):
    // Return the first three rows using built‑in method
    RETURN employees.head(3)
```

---

## Examples

```
Example 1:
  Input: DataFrame employees
  +-------------+-----------+-----------------------+--------+
  | employee_id | name      | department            | salary |
  +-------------+-----------+-----------------------+--------+
  | 3           | Bob       | Operations            | 48675  |
  | 90          | Alice     | Sales                 | 11096  |
  | 9           | Tatiana   | Engineering           | 33805  |
  | 60          | Annabelle | InformationTechnology | 37678  |
  | 49          | Jonathan  | HumanResources        | 23793  |
  | 43          | Khaled    | Administration        | 40454  |
  +-------------+-----------+-----------------------+--------+
  Output:
  +-------------+---------+-------------+--------+
  | employee_id | name    | department  | salary |
  +-------------+---------+-------------+--------+
  | 3           | Bob     | Operations  | 48675  |
  | 90          | Alice   | Sales       | 11096  |
  | 9           | Tatiana | Engineering | 33805  |
  +-------------+---------+-------------+--------+
  Explanation: Only the first 3 rows are displayed.
```

---

## Walkthrough

1. Call `selectFirstRows(employees)`.
2. Inside the function, `employees.head(3)` extracts rows with indices 0,1,2.
3. The resulting DataFrame containing those rows is returned.

---

## Complexity Analysis

- **Time:** O(1) – Pandas retrieves a view of the first three rows without scanning the entire DataFrame.
- **Space:** O(1) – Only a reference to the three rows is created.

---

## Key Takeaway

> **`df.head(n)` returns the first n rows of a DataFrame — the most common way to preview data in Pandas.**