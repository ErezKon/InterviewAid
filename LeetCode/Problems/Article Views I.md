# 1148. Article Views I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/article-views-i](https://leetcode.com/problems/article-views-i)
**Companies:** Accenture, Amazon, Bloomberg, Cognizant, Google, Linkedin, Meta, Microsoft, Tcs

---

```sql
SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id;
```
