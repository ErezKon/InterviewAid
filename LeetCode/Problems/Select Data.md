# 2880. Select Data

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Google, Microsoft
---

## Problem Description

Given a `students` DataFrame, select the `name` and `age` of the student with `student_id = 101`.

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

**Example 1:**
```
students = DataFrame([
    {"student_id": 101, "name": "Alice", "age": 20, "grade": "A"},
    {"student_id": 102, "name": "Bob",   "age": 21, "grade": "B"}
])
Output: [{"name": "Alice", "age": 20}]
```

**Example 2:**
```
students = DataFrame([
    {"student_id": 103, "name": "Carol", "age": 22, "grade": "A"},
    {"student_id": 101, "name": "Dave",  "age": 23, "grade": "C"}
])
Output: [{"name": "Dave", "age": 23}]
```

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
