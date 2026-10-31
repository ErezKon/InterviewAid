# 608. Tree Node

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tree-node](https://leetcode.com/problems/tree-node)
**Companies:** Bloomberg, Google, Meta, Twitter

---

## Problem Description

Table: `Tree`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| p_id        | int  |
+-------------+------+
id is the column with unique values for this table.
Each row of this table contains information about the id of a node and the id of its parent node in a tree.
The given structure is always a valid tree.
```

Each node in the tree can be one of three types:

- **"Leaf"**: if the node is a leaf node.
- **"Root"**: if the node is the root of the tree.
- **"Inner"**: If the node is neither a leaf node nor a root node.

Write a solution to report the type of each node in the tree.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Tree table:
+----+------+
| id | p_id |
+----+------+
| 1  | null |
| 2  | 1    |
| 3  | 1    |
| 4  | 2    |
| 5  | 2    |
+----+------+
Output:
+----+-------+
| id | type  |
+----+-------+
| 1  | Root  |
| 2  | Inner |
| 3  | Leaf  |
| 4  | Leaf  |
| 5  | Leaf  |
+----+-------+
Explanation:
Node 1 is the root node because its parent node is null and it has child nodes 2 and 3.
Node 2 is an inner node because it has parent node 1 and child node 4 and 5.
Nodes 3, 4, and 5 are leaf nodes because they have parent nodes and they do not have child nodes.
```

**Example 2:**
```
Input:
Tree table:
+----+------+
| id | p_id |
+----+------+
| 1  | null |
+----+------+
Output:
+----+-------+
| id | type  |
+----+-------+
| 1  | Root  |
+----+-------+
Explanation: If there is only one node on the tree, you only need to output its root attributes.
Note: This question is the same as  3054: Binary Tree Nodes.
```

## Approach
Use a `CASE` expression:
1. Detect the root where `p_id IS NULL`.
2. Detect inner nodes by checking if the node appears as a parent in any other row.
3. All remaining nodes are leaves.

## Walkthrough
| Step | Condition Checked | Result |
|------|-------------------|--------|
| Row with `p_id IS NULL` | Root condition true | type = 'Root' |
| Row where `id` appears in sub-query `SELECT DISTINCT p_id …` | Inner condition true | type = 'Inner' |
| Otherwise | Neither condition true | type = 'Leaf' |

## Complexity Analysis
- **Time:** O(N) – the sub-query scans the table once, and the outer query scans it again.
- **Space:** O(N) – temporary set of parent ids produced by the sub-query.

## Follow-Up Questions
1. How would you modify the query to also return the depth of each node?
2. Can you write a version that works on hierarchical data stored in a single `path` column?
3. How would you handle cycles or invalid parent references?

## Key Takeaway
A single `CASE` statement combined with a sub-query that extracts all parent identifiers cleanly classifies nodes as root, inner, or leaf in pure SQL.
