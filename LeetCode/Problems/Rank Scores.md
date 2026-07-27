# 178. Rank Scores

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rank-scores](https://leetcode.com/problems/rank-scores)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

```sql
SELECT score,
    DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM Scores
ORDER BY score DESC;
```
