# 1112. Highest Grade For Each Student

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/highest-grade-for-each-student](https://leetcode.com/problems/highest-grade-for-each-student)
**Companies:** Coursera, Google
---

## 1. Problem Description

Given a table `Enrollments(student_id, course_id, grade)`, return for each `student_id` the `course_id` with the highest `grade`. If multiple courses share the top grade, choose the smallest `course_id`.

## 2. Examples

| student_id | course_id | grade |
|------------|-----------|-------|
| 1 | 101 | 85 |
| 1 | 102 | 92 |
| 1 | 103 | 92 |
| 2 | 201 | 78 |
| 2 | 202 | 88 |

**Output**
| student_id | course_id | grade |
|------------|-----------|-------|
| 1 | 102 | 92 |
| 2 | 202 | 88 |

*Explanation*: Student 1 has two courses with grade 92; the smaller `course_id` 102 is chosen.

## 3. Approach: Window Function — O(N log N) ✅

```text
FUNCTION highestGradePerStudent():
    // Use ROW_NUMBER partitioned by student, ordered by grade DESC then course_id ASC
    WITH ranked AS (
        SELECT *, ROW_NUMBER() OVER (
            PARTITION BY student_id
            ORDER BY grade DESC, course_id ASC
        ) AS rn
        FROM Enrollments
    )
    SELECT student_id, course_id, grade
    FROM ranked
    WHERE rn = 1
    ORDER BY student_id;
```

## 4. Walkthrough

1. **Rank rows**: For each `student_id`, rows are ordered by `grade` descending, breaking ties with `course_id` ascending. `ROW_NUMBER` assigns `1` to the best row.
2. **Select top row**: Filter `rn = 1` to keep only the highest‑grade course per student.
3. **Result**: Return the selected columns, sorted by `student_id`.

## 5. Complexity Analysis

- **Time**: The window function sorts each partition → O(N log N) where N is number of enrollment rows.
- **Space**: O(N) for the intermediate ranked table.

## 6. Follow‑Up Questions

- How would you modify the query to return the top K courses per student?
- How to handle ties by returning all courses with the highest grade?
- Can the solution be expressed without window functions (e.g., using `MAX` and joins)?

## Key Takeaway

> `ROW_NUMBER()` partitioned by `student_id` and ordered by `grade` descending then `course_id` ascending cleanly extracts each student's highest‑grade course.
