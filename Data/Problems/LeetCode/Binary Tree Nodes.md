# 3054. Binary Tree Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-nodes](https://leetcode.com/problems/binary-tree-nodes)
**Companies:** Google

---

## 1. Problem Description

Table: `Tree`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| N           | int  |
| P           | int  |
+-------------+------+
N is the column of unique values for this table.
Each row includes N and P, where N represents the value of a node in Binary Tree, and P is the parent of N.
```

Write a solution to find the node type of the Binary Tree. Output one of the following for each node:

- **Root**: if the node is the root node.
- **Leaf**: if the node is the leaf node.
- **Inner**: if the node is neither root nor leaf node.

Return *the result table ordered by node value in **ascending order***.

The result format is in the following example.

**Note:** This question is the same as 608: Tree Node.

---

## 2. Examples

```
Example 1:
  Input:
  Tree table:
  +---+------+
  | N | P    |
  +---+------+
  | 1 | 2    |
  | 3 | 2    |
  | 6 | 8    |
  | 9 | 8    |
  | 2 | 5    |
  | 8 | 5    |
  | 5 | null |
  +---+------+
  Output:
  +---+-------+
  | N | Type  |
  +---+-------+
  | 1 | Leaf  |
  | 2 | Inner |
  | 3 | Leaf  |
  | 5 | Root  |
  | 6 | Leaf  |
  | 8 | Inner |
  | 9 | Leaf  |
  +---+-------+
  Explanation:
  - Node 5 is the root node since it has no parent node.
  - Nodes 1, 3, 6, and 9 are leaf nodes because they don't have any child nodes.
  - Nodes 2, and 8 are inner nodes as they serve as parents to some of the nodes in the structure.
```

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
