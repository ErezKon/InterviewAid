# 610. Triangle Judgement

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/triangle-judgement](https://leetcode.com/problems/triangle-judgement)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```sql
SELECT x, y, z,
    CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle
FROM Triangle;
```
