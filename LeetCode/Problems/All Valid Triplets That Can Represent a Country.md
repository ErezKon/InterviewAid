# 1623. All Valid Triplets That Can Represent a Country

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/all-valid-triplets-that-can-represent-a-country](https://leetcode.com/problems/all-valid-triplets-that-can-represent-a-country)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.** Given three tables `SchoolA`, `SchoolB`, `SchoolC` each with `student_name` and `student_id`, find all triplets (one from each school) where all three names are different.

---

## 2. Approach: Cross Join with Filter ✅

```sql
SELECT a.student_name AS member_A, b.student_name AS member_B, c.student_name AS member_C
FROM SchoolA a
CROSS JOIN SchoolB b
CROSS JOIN SchoolC c
WHERE a.student_name != b.student_name
  AND b.student_name != c.student_name
  AND a.student_name != c.student_name;
```

---

## Key Takeaway

> Three-way cross join with pairwise inequality. For small tables, this is straightforward and performant.
