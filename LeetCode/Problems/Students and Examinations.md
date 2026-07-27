# 1280. Students and Examinations

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/students-and-examinations](https://leetcode.com/problems/students-and-examinations)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Roblox

---

```sql
SELECT s.student_id, s.student_name, sub.subject_name,
    COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;
```
