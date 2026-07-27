# 2989. Class Performance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/class-performance](https://leetcode.com/problems/class-performance)
**Companies:** Google

---

## 1. Problem Description

Given a `Scores` table with `student_id` and `score`, find the difference between the highest and lowest scores in the class. *(SQL problem)*

---

## 2. Approach: MAX - MIN — O(n) ✅

```sql
SELECT MAX(score) - MIN(score) AS score_range
FROM Scores;
```

---

## Key Takeaway

> Simple aggregate range query: `MAX(col) - MIN(col)` gives the spread of values in a single pass.
