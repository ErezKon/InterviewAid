# 3421. Find Students Who Improved

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-students-who-improved](https://leetcode.com/problems/find-students-who-improved)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Window Functions (FIRST_VALUE / LAG) ✅](#4-approach-window-functions--first_value--lag-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a `Scores` table with `student_id`, `subject`, `score`, and `exam_date`, find students whose **latest score** in a subject is **higher** than their **first score** in that same subject. Return `student_id`, `subject`, `first_score`, and `latest_score`.

---

## 2. Examples

```
Input:
Scores:
| student_id | subject | score | exam_date  |
|-----------|---------|-------|------------|
| 1         | Math    | 70    | 2023-01-01 |
| 1         | Math    | 85    | 2023-06-01 |
| 2         | Math    | 90    | 2023-01-01 |
| 2         | Math    | 85    | 2023-06-01 |

Output:
| student_id | subject | first_score | latest_score |
|-----------|---------|-------------|-------------|
| 1         | Math    | 70          | 85          |

Explanation: Student 1 improved from 70 to 85. Student 2 declined from 90 to 85.
```

---

## 3. Key Insight

> Use **FIRST_VALUE** and **LAST_VALUE** window functions partitioned by (student, subject) ordered by exam_date to get the first and latest scores, then filter where latest > first.

---

## 4. Approach: Window Functions (FIRST_VALUE / LAG) ✅

```
WITH Ranked AS (
    SELECT student_id, subject, score, exam_date,
           FIRST_VALUE(score) OVER (
               PARTITION BY student_id, subject
               ORDER BY exam_date
           ) AS first_score,
           FIRST_VALUE(score) OVER (
               PARTITION BY student_id, subject
               ORDER BY exam_date DESC
           ) AS latest_score,
           ROW_NUMBER() OVER (
               PARTITION BY student_id, subject
               ORDER BY exam_date
           ) AS rn
    FROM Scores
)
SELECT student_id, subject, first_score, latest_score
FROM Ranked
WHERE rn = 1 AND latest_score > first_score
ORDER BY student_id, subject;
```

---

## 5. Walkthrough

```
Student 1, Math:
  first_score = 70 (2023-01-01)
  latest_score = 85 (2023-06-01)
  85 > 70 → included ✅

Student 2, Math:
  first_score = 90 (2023-01-01)
  latest_score = 85 (2023-06-01)
  85 > 90? No → excluded ✗
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — window function with ordering |
| **Space** | O(n) — intermediate results |

---

## 7. Key Takeaway

> **FIRST_VALUE with ASC and DESC ordering** is a clean way to get both the earliest and latest values per group in a single query, avoiding self-joins.
