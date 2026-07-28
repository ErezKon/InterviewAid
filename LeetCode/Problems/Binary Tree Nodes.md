# 3054. Binary Tree Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-nodes](https://leetcode.com/problems/binary-tree-nodes)
**Companies:** Google

---

## 1. Problem Description

Given a `Tree` table with `N` (node) and `P` (parent), classify each node as `'Root'`, `'Inner'`, or `'Leaf'`. *(SQL problem)*

---

## 2. Examples

**Example 1:**
```
Tree Table:
N | P
1 | NULL
2 | 1
3 | 1
4 | 2
5 | 2
6 | 3
```
Output:
```
1 | Root
2 | Inner
3 | Inner
4 | Leaf
5 | Leaf
6 | Leaf
```
Explanation: Node 1 has no parent → Root. Nodes 2 and 3 appear as parents → Inner. Nodes 4‑6 never appear as a parent → Leaf.

---

## 3. Approach: CASE with Subquery — O(n) ✅

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

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Identify rows where `P` is `NULL` → those `N` are Roots. |
| 2 | Collect all distinct `P` values (excluding `NULL`). Any `N` appearing here is an Inner node. |
| 3 | Remaining `N` values that are not Roots or Inner become Leaves. |
| 4 | Use a `CASE` expression to assign the label for each row in a single SELECT. |

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – one scan to collect parents and another to evaluate CASE | O(n) – storing distinct parent set |

---

## 6. Follow-Up Questions

* How would you adapt the query for a forest (multiple trees)?
* Can you compute the depth of each node using SQL window functions?

---

## Key Takeaway

> A node is Root if parent is NULL, Leaf if it never appears as a parent, and Inner otherwise. Use a subquery or LEFT JOIN to check parent existence.
