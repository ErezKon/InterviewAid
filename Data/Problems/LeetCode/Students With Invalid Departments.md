# 1350. Students With Invalid Departments

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/students-with-invalid-departments
**Companies:** Amazon
---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Departments`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
In SQL, id is the primary key of this table.
The table has information about the id of each department of a university.
```

Table: `Students`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
| department_id | int     |
+---------------+---------+
In SQL, id is the primary key of this table.
The table has information about the id of each student at a university and the id of the department he/she studies at.
```

Find the id and the name of all students who are enrolled in departments that no longer exist.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Departments table:
+------+--------------------------+
| id   | name                     |
+------+--------------------------+
| 1    | Electrical Engineering   |
| 7    | Computer Engineering     |
| 13   | Bussiness Administration |
+------+--------------------------+
Students table:
+------+----------+---------------+
| id   | name     | department_id |
+------+----------+---------------+
| 23   | Alice    | 1             |
| 1    | Bob      | 7             |
| 5    | Jennifer | 13            |
| 2    | John     | 14            |
| 4    | Jasmine  | 77            |
| 3    | Steve    | 74            |
| 6    | Luis     | 1             |
| 8    | Jonathan | 7             |
| 7    | Daiana   | 33            |
| 11   | Madelynn | 1             |
+------+----------+---------------+
Output:
+------+----------+
| id   | name     |
+------+----------+
| 2    | John     |
| 7    | Daiana   |
| 4    | Jasmine  |
| 3    | Steve    |
+------+----------+
Explanation:
John, Daiana, Steve, and Jasmine are enrolled in departments 14, 33, 74, and 77 respectively. department 14, 33, 74, and 77 do not exist in the Departments table.
```

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
