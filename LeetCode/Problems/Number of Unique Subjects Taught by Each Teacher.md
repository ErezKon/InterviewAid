# 2356. Number of Unique Subjects Taught by Each Teacher

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Capgemini, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL GROUP BY — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

For each teacher, count the number of distinct subjects they teach.

---

## 2. Approach: SQL GROUP BY — O(n) ✅

```
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher GROUP BY teacher_id;
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 4. Key Takeaway

> **COUNT(DISTINCT ...) with GROUP BY.** Standard aggregation pattern for counting unique values per group.
