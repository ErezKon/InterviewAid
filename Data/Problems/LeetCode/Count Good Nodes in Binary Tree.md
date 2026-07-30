# 1448. Count Good Nodes in Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-good-nodes-in-binary-tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree)
**Companies:** Amazon, Docusign, Goldman Sachs, Google, Josh Technology, Meta, Microsoft

---

## Problem Description
Given the root of a binary tree, a node is considered **good** if every node on the path from the root to that node has a value less than or equal to the node's value. Return the number of good nodes in the tree.

## Examples
**Example 1:**
```
Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: The good nodes are the root (3), the right child (4), the left grand‑child (3) and the right‑most leaf (5).
```
**Example 2:**
```
Input: root = [3,3,null,4,2]
Output: 3
Explanation: The good nodes are the root (3), its left child (3) and the left‑most leaf (4).
```

## Approach
Perform a depth‑first search while tracking the maximum value seen on the current path. A node is good if its value is at least this maximum. Update the maximum when recursing to children.

### Pseudocode
```text
FUNCTION countGoodNodes(root):
    RETURN dfs(root, -∞)

FUNCTION dfs(node, maxSoFar):
    IF node IS NULL: RETURN 0
    good ← 1 IF node.val ≥ maxSoFar ELSE 0
    newMax ← MAX(maxSoFar, node.val)
    RETURN good + dfs(node.left, newMax) + dfs(node.right, newMax)
```

## Walkthrough
For the tree `[3,1,4,3,null,1,5]`:
| Node | maxSoFar before | good? | newMax |
|------|----------------|-------|--------|
| 3 (root) | -∞ | yes | 3 |
| 1 (left) | 3 | no | 3 |
| 3 (left‑left) | 3 | yes | 3 |
| 4 (right) | 3 | yes | 4 |
| 1 (right‑left) | 4 | no | 4 |
| 5 (right‑right) | 4 | yes | 5 |
Total good nodes = 4.

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack height `h` (worst‑case O(n)).

## Follow-Up Questions
1. How would you solve the problem iteratively using a stack?
2. Can the approach be adapted to count nodes that are **strictly** greater than all ancestors?
3. What changes are needed if the tree is given as a parent array instead of node objects?

## Key Takeaway
Tracking the maximum value along the root‑to‑node path enables a linear‑time DFS to count good nodes.
