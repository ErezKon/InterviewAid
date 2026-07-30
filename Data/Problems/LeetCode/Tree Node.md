# 608. Tree Node

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tree-node](https://leetcode.com/problems/tree-node)
**Companies:** Bloomberg, Google, Meta, Twitter

---

## Problem Description
Given a table `Tree` with columns `id` (node identifier) and `p_id` (parent identifier, NULL for the root), write a SQL query that classifies each node as **Root**, **Inner** (has children), or **Leaf** (no children).

## Examples
- **Example:**
  ```sql
  SELECT id,
      CASE
          WHEN p_id IS NULL THEN 'Root'
          WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
          ELSE 'Leaf'
      END AS type
  FROM Tree;
  ```
  For a tree where node 1 is the root, nodes 2 and 3 are children of 1, and node 4 is a child of 2, the query returns:
  | id | type |
  |----|------|
  | 1  | Root |
  | 2  | Inner |
  | 3  | Leaf |
  | 4  | Leaf |

## Approach
Use a `CASE` expression:
1. Detect the root where `p_id IS NULL`.
2. Detect inner nodes by checking if the node appears as a parent in any other row.
3. All remaining nodes are leaves.

## Walkthrough
| Step | Condition Checked | Result |
|------|-------------------|--------|
| Row with `p_id IS NULL` | Root condition true | type = 'Root' |
| Row where `id` appears in sub‑query `SELECT DISTINCT p_id …` | Inner condition true | type = 'Inner' |
| Otherwise | Neither condition true | type = 'Leaf' |

## Complexity Analysis
- **Time:** O(N) – the sub‑query scans the table once, and the outer query scans it again.
- **Space:** O(N) – temporary set of parent ids produced by the sub‑query.

## Follow‑Up Questions
1. How would you modify the query to also return the depth of each node?
2. Can you write a version that works on hierarchical data stored in a single `path` column?
3. How would you handle cycles or invalid parent references?

## Key Takeaway
A single `CASE` statement combined with a sub‑query that extracts all parent identifiers cleanly classifies nodes as root, inner, or leaf in pure SQL.
