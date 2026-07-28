# 2879. Display the First Three Rows

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/display-the-first-three-rows](https://leetcode.com/problems/display-the-first-three-rows)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

Given a DataFrame `employees`, display the **first 3 rows**. This is a Pandas problem.

---

## Approach: Pandas head() ✅

```text
FUNCTION selectFirstRows(employees):
    // Return the first three rows using built‑in method
    RETURN employees.head(3)
```

---

## Examples

| employees (first 5 rows) | Output (first 3 rows) |
|--------------------------|-----------------------|
| `[["Alice", 30], ["Bob", 25], ["Carol", 27], ["Dave", 22], ["Eve", 29]]` | `[["Alice", 30], ["Bob", 25], ["Carol", 27]]` |
| `[[1,2],[3,4],[5,6],[7,8]]` | `[[1,2],[3,4],[5,6]]` |

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