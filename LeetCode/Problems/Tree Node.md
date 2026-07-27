# 608. Tree Node

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tree-node](https://leetcode.com/problems/tree-node)
**Companies:** Bloomberg, Google, Meta, Twitter

---

```sql
SELECT id,
    CASE
        WHEN p_id IS NULL THEN 'Root'
        WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
        ELSE 'Leaf'
    END AS type
FROM Tree;
```
