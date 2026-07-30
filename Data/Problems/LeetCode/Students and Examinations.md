# 1280. Students and Examinations

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/students-and-examinations
**Companies:** Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Roblox
---

## Problem Description
Given three tables — `Students(student_id, student_name, department_id)`, `Subjects(subject_name)`, and `Examinations(student_id, subject_name)` — return, for every student and every subject, the number of exams the student has taken for that subject. If a student has not taken any exam for a subject, the count should be `0`. Order the result by `student_id` and then by `subject_name`.

## Examples
| Students | Subjects | Examinations | Output |
|----------|----------|--------------|--------|
| `(1, Alice, 10)`<br>`(2, Bob, 20)` | `(Math)`, `(Physics)` | `(1, Math)`, `(1, Physics)`, `(2, Math)` | `1, Alice, Math, 1`<br>`1, Alice, Physics, 1`<br>`2, Bob, Math, 1`<br>`2, Bob, Physics, 0` |
| `(3, Carol, 30)` | `(Chemistry)` | *(none)* | `3, Carol, Chemistry, 0` |

## Approach
The query uses a **cross join** to generate every `(student, subject)` pair, then a **left join** to attach matching examinations and count them. The `COUNT` aggregates the number of exams per pair, treating missing rows as `0`.

### Pseudocode
```text
FUNCTION getExamCounts():
    RETURN SELECT s.student_id,
                  s.student_name,
                  sub.subject_name,
                  COUNT(e.subject_name) AS attended_exams
           FROM Students s
           CROSS JOIN Subjects sub
           LEFT JOIN Examinations e
               ON s.student_id = e.student_id
               AND sub.subject_name = e.subject_name
           GROUP BY s.student_id, s.student_name, sub.subject_name
           ORDER BY s.student_id, sub.subject_name;
```

## Walkthrough
Assume the tables from the first example.
1. `CROSS JOIN` creates pairs: `(1, Alice, Math)`, `(1, Alice, Physics)`, `(2, Bob, Math)`, `(2, Bob, Physics)`.
2. `LEFT JOIN` attaches exams: rows for `(1, Math)` and `(1, Physics)` match one exam each; `(2, Math)` matches one; `(2, Physics)` matches none → `NULL`.
3. `COUNT(e.subject_name)` counts non‑NULL matches, yielding `1, 1, 1, 0` respectively.
4. The final `ORDER BY` sorts by `student_id` then `subject_name`.

## Complexity Analysis
- **Time:** O(S × T + E) where *S* is number of students, *T* subjects, and *E* examinations; the cross join dominates.
- **Space:** O(S × T) for the intermediate result set.

## Follow-Up Questions
1. How would you modify the query to include only subjects a student has taken at least once?
2. Can you write the same logic using `NOT EXISTS` to filter missing exams?
3. How would you handle very large tables efficiently (e.g., using indexing or partitioning)?

## Key Takeaway
A cross join combined with a left join and aggregation provides a concise way to compute per‑student, per‑subject exam counts, automatically yielding `0` for missing records.
