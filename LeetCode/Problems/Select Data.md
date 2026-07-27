# 2880. Select Data

**Difficulty:** 🟢 Easy

**Companies:** Bloomberg, Google, Microsoft
---

## Problem Description

Given a `students` DataFrame, select the `name` and `age` of the student with `student_id = 101`.

---

## Approach

```python
def selectData(students):
    return students[students['student_id'] == 101][['name', 'age']]
```

---

## Key Takeaway

> Boolean indexing + column selection — the fundamental pandas pattern for filtering rows and selecting columns.
