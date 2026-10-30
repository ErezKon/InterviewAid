# 2880. Select Data

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/select-data](https://leetcode.com/problems/select-data)
**Companies:** Bloomberg, Google, Microsoft
---

## Problem Description

```
DataFrame students
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| student_id  | int    |
| name        | object |
| age         | int    |
+-------------+--------+
```

Write a solution to select the name and age of the student with `student_id = 101`.

The result format is in the following example.

```
**Example 1:
Input:**
+------------+---------+-----+
| student_id | name    | age |
+------------+---------+-----+
| 101        | Ulysses | 13  |
| 53         | William | 10  |
| 128        | Henry   | 6   |
| 3          | Henry   | 11  |
+------------+---------+-----+
**Output:**
+---------+-----+
| name    | age |
+---------+-----+
| Ulysses | 13  |
+---------+-----+
**Explanation:
**Student Ulysses has student_id = 101, we select the name and age.
```

---

## Approach

```text
FUNCTION selectData(students):
    // Filter rows where student_id equals 101
    filtered ← students WHERE student_id == 101
    // Select only the name and age columns
    result ← filtered SELECT name, age
    RETURN result
```

---

## Examples



---

## Walkthrough

| Step | Operation | Result |
|------|-----------|--------|
| 1 | Filter rows where `student_id == 101` | Row(s) with that ID remain
| 2 | Select `name` and `age` columns | Table with only those two columns
| 3 | Return the resulting DataFrame | Desired output

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n) — scan each row once |
| Space  | O(k) — output size (k matching rows) |

---

## Follow-Up Questions

1. How would you modify the query to return multiple columns dynamically?
2. How to handle cases where `student_id` does not exist?
3. How to perform the same operation efficiently on a large dataset stored in a SQL database?

---

## Key Takeaway

> Boolean indexing + column selection — the fundamental pandas pattern for filtering rows and selecting columns.
