# 596. Classes With at Least 5 Students

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/classes-with-at-least-5-students](https://leetcode.com/problems/classes-with-at-least-5-students)
**Companies:** Bloomberg, Google, Microsoft

---

```sql
SELECT class FROM Courses
GROUP BY class
HAVING COUNT(student) >= 5;
```
