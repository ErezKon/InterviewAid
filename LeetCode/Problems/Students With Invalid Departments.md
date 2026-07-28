# 1350. Students With Invalid Departments

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/students-with-invalid-departments
**Companies:** Amazon
---

## Problem Description
Given two tables `Students(student_id, student_name, department_id)` and `Departments(department_id, department_name)`, return the names of students whose `department_id` does **not** exist in the `Departments` table. The result should be ordered by `student_id` ascending.

## Examples
| Students Table | Departments Table | Output |
|----------------|-------------------|--------|
| `1, Alice, 10`<br>`2, Bob, 20`<br>`3, Carol, 30` | `10, CS`<br>`30, Math` | `Bob` |
| `1, Dave, 5` | *(empty)* | `Dave` |

## Approach
The task is a classic anti‑join: select rows from `Students` where no matching `department_id` exists in `Departments`. This can be expressed using a `LEFT JOIN` with a `WHERE` filter on `NULL` or using `NOT EXISTS`.

### Pseudocode
```text
FUNCTION findInvalidStudents():
    // SQL query representation
    RETURN SELECT s.student_name
           FROM Students s
           LEFT JOIN Departments d ON s.department_id = d.department_id
           WHERE d.department_id IS NULL
           ORDER BY s.student_id;
```

## Walkthrough
Assume the `Students` table contains `(1, Alice, 10)`, `(2, Bob, 20)`, `(3, Carol, 30)` and `Departments` contains `(10, CS)`, `(30, Math)`.
1. Perform a left join on `department_id`.
2. Rows for Alice and Carol find matches, so `d.department_id` is not NULL.
3. Bob’s row has no match, yielding `NULL` for `d.department_id`.
4. The `WHERE` clause keeps only Bob, and ordering returns `Bob`.

## Complexity Analysis
- **Time:** O(m + n) where *m* and *n* are the row counts of `Students` and `Departments`; the join is typically indexed on `department_id`.
- **Space:** O(m) for the result set.

## Follow-Up Questions
1. How would you modify the query to also return the invalid `department_id` values?
2. How can you write the same logic using `NOT EXISTS`?
3. If the tables are huge, what indexing strategy would improve performance?

## Key Takeaway
An anti‑join (left join with `NULL` filter or `NOT EXISTS`) efficiently identifies rows in one table that lack corresponding entries in another.
