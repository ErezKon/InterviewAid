# 1086. High Five

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/high-five](https://leetcode.com/problems/high-five)
**Companies:** Amazon, Goldman Sachs

---

## 1. Problem Description

Given a list of `(id, score)` pairs, return each student's average of their top 5 scores.

## 2. Approach: Sort + Group — O(n log n) ✅

```
FUNCTION highFive(items):
    SORT items by (id, -score)
    result ← []
    FOR each student_id DO
        top5 ← first 5 scores for this id
        result.ADD([student_id, AVERAGE(top5)])
    RETURN result
```

## Key Takeaway

> Group by student, sort scores descending, take top 5 and average. Alternatively use a min-heap of size 5 per student.
