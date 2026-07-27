# 3054. Binary Tree Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-nodes](https://leetcode.com/problems/binary-tree-nodes)
**Companies:** Google

---

## 1. Problem Description

Given a `Tree` table with `N` (node) and `P` (parent), classify each node as `'Root'`, `'Inner'`, or `'Leaf'`. *(SQL problem)*

---

## 2. Approach: CASE with Subquery — O(n) ✅

```sql
SELECT N,
    CASE
        WHEN P IS NULL THEN 'Root'
        WHEN N IN (SELECT DISTINCT P FROM Tree WHERE P IS NOT NULL) THEN 'Inner'
        ELSE 'Leaf'
    END AS Type
FROM Tree
ORDER BY N;
```

---

## Key Takeaway

> A node is Root if parent is NULL, Leaf if it never appears as a parent, and Inner otherwise. Use a subquery or LEFT JOIN to check parent existence.
