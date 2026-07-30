# 2356. Number of Unique Subjects Taught by Each Teacher

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Capgemini, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL GROUP BY](#2-approach)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

For each teacher, count the number of distinct subjects they teach.

---

## 2. Approach: SQL GROUP BY ✅

```sql
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;
```

---

## 3. Examples

| Teacher Table |
|---------------|
| (1, 'Alice') |
| (2, 'Bob') |
| (1, 'Alice') |

| Subject Table |
|---------------|
| (1, 101) |
| (1, 102) |
| (2, 101) |
| (2, 103) |

**Result**
| teacher_id | cnt |
|------------|-----|
| 1 | 2 |
| 2 | 2 |

*Explanation*: Teacher 1 teaches subjects 101 and 102 (2 distinct). Teacher 2 teaches subjects 101 and 103 (2 distinct).

---

## 4. Walkthrough

**Step 1 – Group by teacher**

```
SELECT teacher_id, subject_id FROM Teacher;
```

**Step 2 – Count distinct subjects per teacher**

```
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;
```

The `COUNT(DISTINCT ...)` aggregates unique subject IDs for each teacher, producing the final counts.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 6. Follow-Up Questions

1. How would you modify the query to list only teachers with more than *k* distinct subjects?
2. How can you compute the total number of distinct subjects across all teachers?
3. Extend the solution to handle a many‑to‑many relationship stored in a separate `TeacherSubject` junction table.

---

## 7. Key Takeaway

> **COUNT(DISTINCT ...) with GROUP BY.** Standard aggregation pattern for counting unique values per group.
